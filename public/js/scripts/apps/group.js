var dt_table;

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
      select = $('.select2')

  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $('.modal').on('hidden.bs.modal', function(){
    if($(this).hasClass('editData')){
      $(this).removeClass('editData')
      $('.modal-title').text('Add New Group')
      $('form').removeClass('editData')
      $('form').trigger('reset');
    }
  });

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

  dt_table = table.DataTable({
    responsive: true,
    processing: true,
    buttons: [],
    serverSide: true,
    order: [[1, 'desc']],
    dom: '<<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    ajax: {
      url: '/group-datatable',
      method: 'get'
    },
    columns: [
      { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false,},
      { data:'name' },
      { data:'grade' },
      { data: 'description' },
      { data: null, className: 'text-center', orderable: false, render: function(row){
          var edit = row.actions.edit ? '<button class="btn btn-icon btn-flat-primary rounded-circle waves-effect" oncLick="edit('+row.id+')">' +
          feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
          '</button>' : '';
          var destory = row.actions.delete ? '<button class="btn btn-icon btn-flat-danger rounded-circle  waves-effect" id="btn-delete" oncLick="confirmDetele('+row.id+')">' +
          feather.icons['trash'].toSvg({ class: 'font-small-4' }) +
          '</button>' : '';
        return (
          edit +' '+destory
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
      name: {
        required: true
      },
      grade: {
        required: true
      },
      company: {
        required: true
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
      var $name     = $('#name').val(),
      $grade        = $('#grade').val(),
      $description  = $('#description').val(),
      $company_id   = $('#company').val()

      $.ajax({
        url: '/group',
        type: 'POST',
        data: {
          'name'        : $name,
          'grade'        : $grade,
          'description' : $description,
          'company_id'  : $company_id
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
      var $name     = $('#name').val(),
        $grade     = $('#grade').val(),
        $description     = $('#description').val(),
        $id         = $('#group_id').val(),
        $company_id     = $('#company').val()

      $.ajax({
        url: '/group/'+$id,
        type: 'PUT',
        data: {
          'name'                    : $name,
          'grade'                    : $grade,
          'description'             : $description,
          'company_id'  : $company_id
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
    url: '/group/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var group = response.data
        $('#formNewRecord').addClass('editData')
        $('.modal').addClass('editData')
        $('#addNewRecordLabel').text('Edit Group')
        $('#group_id').val(group.id)
        $('#name').val(group.name),
        $('#grade').val(group.grade),
        $('#company').val(group.company_id).change()
        $('#description').val(group.description),
        
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
        url: '/group/'+$id,
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