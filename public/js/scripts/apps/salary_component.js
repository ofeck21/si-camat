/**
 * DataTables Basic
 */
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
    select = $('.select2'),
    formImport = $('#formImport')

  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  $('.modal').on('hidden.bs.modal', function(){
    if($(this).hasClass('editData')){
      $(this).removeClass('editData')
    }
    $('.modal-title').text('Add New Salary')
    $('form').removeClass('editData')
    $('#company').val(0).change();
    $('#type').val(0).change();
    $('#given').val(0).change();
    $('form').trigger('reset');
  });

  $('.modal').on('show.bs.modal', function(){
    if(!$(this).hasClass('editData')){
      $('#component_code').val(generateCode(5))
    }
  });

  $('#btn_generate_code').on('click', function () {
    $('#component_code').val(generateCode(5))
  })

  $('#nominal').on('keyup', function(){
    $('#nominal').val(priceFormat(this.value))
  })
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


  // DataTable with buttons
  // --------------------------------------------------------------------
  dt_table = table.DataTable({
    responsive: true,
    processing: true,
    buttons: [],
    serverSide: true,
    order: [[1, 'desc']],
    dom: '<<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    ajax: {
      url: '/salary-components-datatable',
      method: 'get'
    },
    columns: [
      { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false},
      { data: 'code' },
      { data: 'name' },
      { data: 'type', render: function(type){
        return type == 'allowance' ? '<span class="badge rounded-pill bg-success">Allowance</span>' : '<span class="badge rounded-pill bg-danger">Reduction</span>'
      } },
      { data: 'is_primary', render: function(row){
        return row ? 'Yes' : 'No'
      }},
      { data: 'nominal', render: function(nominal){
        return 'Rp '+priceFormat(nominal)+',-'
      } },
      {
        data: 'given'
      },
      { data: null, className: 'text-center', orderable: false, render: function(row){
        var show ='<a href="/salary-components/'+row.id+'/detail" class="btn btn-icon btn-flat-success rounded-circle waves-effect">' +
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
      name: {
        required: true
      },
      nominal: {
        required: true
      },
      company: {
        required: true
      },
      component_code: {
        required: true,
        maxlength: 5
      },
      type: {
        required: true
      },
      given: {
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
          $company     = $('#company').val(),
          $code     = $('#component_code').val(),
          $nominal  = $('#nominal').val(),
          $type  = $('#type').val()
          $is_primary = $('#is_primary').prop('checked')
          $given = $('#given').val()

      $.ajax({
        url: '/salary-components',
        type: 'POST',
        data: {
          'name'          : $name,
          'company_id'    : $company,
          'code'          : $code,
          'nominal'       : $nominal,      
          'type'          : $type,
          'is_primary'    : $is_primary,
          'given'         : $given    
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

  formImport.validate({
    rules: {
      file: {
        required: true
      }
    }
  })

  formImport.on('submit', function(e){
    e.preventDefault()
    if(formImport.valid()){
      var $formData     = new FormData(this)
      $.ajax({
        url: '/salary-components/import/all',
        type: 'POST',
        data: $formData,
        cache:false,
        contentType: false,
        processData: false,
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
  })

  // Updaterecord
  function updateData(){
    var isValid = form.valid();

    if(isValid){
      var $name     = $('#name').val(),
        $id         = $('#item_id').val(),
        $company    = $('#company').val(),
        $code       = $('#component_code').val(),
        $nominal    = $('#nominal').val(),
        $type       = $('#type').val()
        $is_primary = $('#is_primary').prop('checked'),
        $given      = $('#given').val(),

      $.ajax({
        url: '/salary-components/'+$id,
        type: 'PUT',
        data: {
          'name'          : $name,
          'company_id'    : $company,
          'code'          : $code,
          'nominal'       : $nominal,
          'type'          : $type,
          'is_primary'    : $is_primary,
          'given'         : $given
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
    url: '/salary-components/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var item = response.data
        $('#formNewRecord').addClass('editData')
        $('#addNewRecord').addClass('editData')
        $('#addNewRecordLabel').text('Edit Shift')
        $('#item_id').val(item.id)
        $('#name').val(item.name)
        $('#company').val(item.company_id).change()
        $('#nominal').val(priceFormat(item.nominal))
        $('#component_code').val(item.code)
        $('#item_id').val(item.id)
        $('#type').val(item.type).change()
        $('#given').val(item.given).change()
        $('#is_primary').prop('checked', item.is_primary);
        
        $('#addNewRecord').modal('show')
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
        url: '/salary-components/'+$id,
        type: 'delete',
        success: function(response){
          if(response.status){
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

// Generate Code
function generateCode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

// Price Format
function priceFormat(nominal)
{
  if (/\D/g.test(nominal)) nominal = nominal.replace(/\D/g,'')
    let value = parseFloat(nominal)
   return value.toLocaleString("id-ID")
}
