var dt_table

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

$(document).ready(function(){
  

  var table = $('.datatables-basic'),
    form = $('#formNewRecord'),
    select = $('.select2');

  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // select2
  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this
      .select2({
        placeholder: 'Select',
        width: '100%',
        dropdownAutoWidth: true,
        dropdownParent: $this.parent(),
        allowClear: true
      })
      .change(function () {
        $(this).valid();
      });
  });

  $('.modal').on('hidden.bs.modal', function(){
    if($(this).hasClass('editData')){
      $(this).removeClass('editData')
      $('#addNewRecordLabel').show()
      $('#editRecordLabel').hide()
      $('#company_status').hide()
      $('#company_type').val("").change()
      $('form').removeClass('editData')
      $('form').trigger('reset');
    }
  });

  // DataTable
  // --------------------------------------------------------------------
dt_table = table.DataTable({
  responsive: true,
  processing: true,
  buttons: [],
  serverSide: true,
  order: [[1, 'desc']],
  ajax: {
    url: '/companies-datatable',
    method: 'get'
  },
  columns: [
    { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false,},
    { data: 'name' },
    { data: 'type', sortable: false, render: function(type){
      return type!=null ? type.name : ''
    } },
    { data: 'email' },
    { data: 'phone' },
    { data: 'status'},
    { data: null, className: 'text-center', orderable: false, render: function(row){
      var show = '<a href="/company/'+row.id+'" class="btn btn-icon btn-flat-info rounded-circle waves-effect">' +
        feather.icons['eye'].toSvg({ class: 'font-small-4' }) +
        '</a>';
        var edit = row.actions.edit ? '<button class="btn btn-icon btn-flat-primary rounded-circle waves-effect" oncLick="edit('+row.id+')">' +
        feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
        '</button>' : '';
        var destory = row.actions.delete ? '<button class="btn btn-icon btn-flat-danger rounded-circle  waves-effect" id="btn-delete" oncLick="confirmDetele('+row.id+')">' +
        feather.icons['trash'].toSvg({ class: 'font-small-4' }) +
        '</button>' : '';
      return (
        show+' '+edit +' '+destory
      );
      } 
    }
  ],
  language: {
    paginate: {
      // remove previous & next text from pagination
      previous: '&nbsp;',
      next: '&nbsp;'
    }
  }
});

  // jQuery Validation
  // --------------------------------------------------------------------
  form.validate({
    rules: {
      company_name: {
        required: true
      },
      company_type: {
        required: true
      },
      address: {
        required: true
      },
      phone: {
        number: true,
        maxlength: 12
      },
      website: {
        url: true
      },
      email: {
        email: true
      }
    }
  });

  // Add New record
  form.on('submit', function (e) {
    e.preventDefault();
    if(form.hasClass('editData')){
      updateData()
    }else{
    var isValid = form.valid();

    if(isValid){
      var $name     = $('#company_name').val(),
        $type       = $('#company_type').val(),
        $phone      = $('#phone').val(),
        $web        = $('#website').val(),
        $address    = $('#address').val(),
        $email      = $('#email').val(),
        $npwp       = $('#npwp').val(),
        $tdp        = $('#tdp').val(),
        $siup       = $('#siup').val(),
        $longitude  = $('#longitude').val(),
        $latitude   = $('#latitude').val(),
        $note       = $('#note').val()

      $.ajax({
        url: '/companies',
        type: 'POST',
        data: {
          'name'    : $name,
          'type'    : $type,
          'phone'   : $phone,
          'web'     : $web,
          'address' : $address,
          'email'   : $email,
          'npwp'    : $npwp,
          'tdp'     : $tdp,
          'siup'    : $siup,
          'longitude': $longitude,
          'latitude': $latitude,
          'note'    : $note
        },
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            dt_table.ajax.reload()
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Ooops...',
              text: 'Something went wrong!',
              footer: '<span class="text-danger">'+response.message+'</span>',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
          }
        }
      }).fail( function(error){
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'Something went wrong!',
          footer: '<span class="text-danger">'+error.responseJSON.message+'</span>',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
          
        console.log(error.responseJSON);
      })
    }
  }
  });

  // Updaterecord
  function updateData(){
    var isValid = form.valid();

    if(isValid){
      var $name     = $('#company_name').val(),
        $type     = $('#company_type').val(),
        $phone    = $('#phone').val(),
        $web      = $('#website').val(),
        $address  = $('#address').val(),
        $id       = $('#company_id').val();
        $npwp     = $('#npwp').val()
        $tdp      = $('#tdp').val()
        $siup     = $('#siup').val()
        $email    = $('#email').val()
        $longitude= $('#longitude').val()
        $latitude = $('#latitude').val()
        $note     = $('#note').val()
        $status   = $('#status').val()

      $.ajax({
        url: '/companies/'+$id,
        type: 'PUT',
        data: {
          'name'    : $name,
          'type'    : $type,
          'phone'   : $phone,
          'web'     : $web,
          'address' : $address,
          'npwp'    : $npwp,
          'tdp'     : $tdp,
          'siup'    : $siup,
          'email'   : $email,
          'longitude': $longitude,
          'latitude': $latitude,
          'note'    : $note,
          'status'  : $status
        },
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            dt_table.ajax.reload()
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Ooops...',
              text: 'Something went wrong!',
              footer: '<span class="text-danger">'+response.message+'</span>',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            });
          }
        }
      }).fail( function(error){
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'Something went wrong!',
          footer: '<span class="text-danger">'+error.responseJSON.message+'</span>',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
          
        console.log(error.responseJSON);
      })
    }
  }


});

function edit($id){
  $.ajax({
    url: '/companies/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var company = response.data
        $('.modal').addClass('editData')
        $('#formNewRecord').addClass('editData')
        $('#addNewRecordLabel').hide()
        $('#editRecordLabel').show()
        $('#company_name').val(company.name)
        $('#company_type').val(company.company_type_id).change()
        $('#phone').val(company.phone)
        $('#website').val(company.website)
        $('#address').val(company.address)
        $('#company_id').val(company.id)
        $('#npwp').val(company.npwp)
        $('#tdp').val(company.tdp)
        $('#siup').val(company.siup)
        $('#email').val(company.email)
        $('#longitude').val(company.longitude)
        $('#latitude').val(company.latitude)
        $('#note').val(company.notes)
        $('#company_status').show()
        $('#status').val(company.status).change()
        $('.modal').modal('show')
      }else{
        Swal.fire({
            icon: 'error',
            title: 'Ooops...',
            text: 'Something went wrong!',
            footer: '<span class="text-danger">'+response.message+'</span>',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
        }
    }
  }).fail(function(error){
    Swal.fire({
      icon: 'error',
      title: 'Ooops...',
      text: 'Something went wrong!',
      footer: '<span class="text-danger">'+error.responseJSON.message+'</span>',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
      
    console.log(error.responseJSON);
  })
}

// Action Delete
function confirmDetele($id){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: !0,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    buttonsStyling: !1,
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger ms-1',
    }
  }).then(function (t) {
    if(t.value){
      $.ajax({
        url: '/companies/'+$id,
        type: 'delete',
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            dt_table.ajax.reload()
          }else{
            Swal.fire({
                icon: 'error',
                title: 'Ooops...',
                text: 'Something went wrong!',
                footer: '<span class="text-danger">'+response.message+'</span>',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              });
            }
        }
      }).fail(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'Something went wrong!',
          footer: '<span class="text-danger">'+error.responseJSON.message+'</span>',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
          
        console.log(error.responseJSON);
      })
     }
  });
}
