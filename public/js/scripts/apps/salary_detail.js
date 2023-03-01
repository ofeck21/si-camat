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
   var table   = $('.datatables-basic'),
        form   = $('#formNewRecord'),
        formImport = $('#formImport')
  
    $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

   $('#nominal').on('keyup', function(){
      $('#nominal').val(priceFormat(this.value))
    })

    $('#edit_nominal').on('keyup', function(){
      $('#edit_nominal').val(priceFormat(this.value))
    })

   $('#filter_month').select2()

   $('.modal').on('hidden.bs.modal', function(){
    $('#department').val(0).change();
    $('#employees').val(0).change();
    $('form').trigger('reset');
  });

   $('#department').select2({
    placeholder: 'Select Department',
    allowClear: true
   }).on('select2:select', function(e){
     let $department_id = e.target.value;
     selectEmployees($department_id)
   }).change(function () {
    $(this).valid();
  });

   $('#employees').select2({
    placeholder: 'Select Department Before',
    allowClear: true
   }).change(function () {
    $(this).valid();
  });

//  Data Table 
  dt_table = table.DataTable({
    destory: true,
    responsive: true,
    processing: true,
    buttons: [],
    serverSide: true,
    order: [[1, 'desc']],
    dom: '<<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    ajax: {
      url: '/salaries-datatable/'+$('#salary_id').val(),
      method: 'get',
      data: function(d){
        d.month = $('#filter_month').select2('val')
      }
    },
    columns: [
      { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false},
      { data: 'month' },
      { data: 'employee_name' },
      { data: 'nominal', render: function(nominal){
        return 'Rp '+priceFormat(nominal)+',-'
      } },
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
      department: {
        required: true
      },
      employees: {
        required: true
      },
      nominal: {
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
        var $employees     = $('#employees').select2('val'),
        $nominal  = $('#nominal').val(),
        $month    = $('#filter_month').select2('val')

        $.ajax({
          url: '/salaries/'+$('#salary_id').val()+'/detail',
          type: 'POST',
          data: {
            'employees'     : $employees,
            'nominal'       : $nominal,
            'month'         : $month     
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

  // Validate Update record
  $('#formEditRecord').validate({
    rules: {
      edit_nominal: {
        required: true
      }
    }
  })
  // Update Record
  $('#formEditRecord').on('submit', function(e){
    e.preventDefault()
    if($('#formEditRecord').valid()){
      var $nominal = $('#edit_nominal').val(),
          $id = $('#edit_id').val()

      $.ajax({
        url: '/salary-detail/'+$id,
        type: 'put',
        data: {
          'nominal'       : $nominal  
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
  })

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
        url: '/salaries/import/employee-salary',
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
})

// Updaterecord
function updateData(){
  var isValid = form.valid();

  if(isValid){
    var $name         = $('#name').val(),
      $id             = $('#item_id').val(),
      $company        = $('#company').val(),
      $code     = $('#salary_code').val(),
      $nominal  = $('#nominal').val()

    $.ajax({
      url: '/salaries/'+$id,
      type: 'PUT',
      data: {
        'name'          : $name,
        'company_id'    : $company,
        'code'          : $code,
        'nominal'       : $nominal
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

// Price Format
function priceFormat(nominal)
{
  if (/\D/g.test(nominal)) nominal = nominal.replace(/\D/g,'')
    let value = parseFloat(nominal)
   return value.toLocaleString("id-ID")
}

// Reload Detail
$('#filter_month').on('select2:select', function(){
  month = $('#filter_month').select2('val')
  dt_table.month = month
  dt_table.ajax.reload();
})

// select employees
function selectEmployees($department_id){
  $('#employees').select2({
    placeholder: 'Select Employee',
    multiple: true,
    allowClear: true,
    ajax: {
      url: '/select/employee-grouping-position-filter-by-department/'+$department_id,
      dataType: 'json',
      data: function (params) {
          return {
              q: $.trim(params.term),
              page: params.page || 1
          };
      },
      processResults: function (data, params) {
        params.page = params.page || 1;
    
        return {
            results: data,
            pagination: {
                more: (params.page * 10) < data.count_filtered
            }
        };
      },
    }
  })
  // .on('select2:selecting', function(e) {
  //   var $select = $(this);
  //   if (e.val == '') {
  //       e.preventDefault();
  //       var childIds = $.map(e.choice.children, function(child) {
  //           return child.id;
  //       });
  //       $select.select2('val', $select.select2('val').concat(childIds));
  //       $select.select2('close');
  //   }
  // });
}

function edit($id){
  $.ajax({
    url: '/salary-detail/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var item = response.data
        $('#editRecordLabel').text('Edit '+item.employee.first_name+' '+item.employee.last_name+' Salary')
        $('#edit_id').val(item.id)
        $('#edit_nominal').val(priceFormat(item.nominal))
        
        $('#editRecord').modal('show')
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
        url: '/salary-detail/'+$id,
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