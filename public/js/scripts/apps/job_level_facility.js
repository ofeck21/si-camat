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
    select = $('.select2');

  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  $('.modal').on('hidden.bs.modal', function(){
    $('#type').val('').change();
    $('#salary').val('').change();
    $('#allowance').val('').change();
    $('#nominal').val('')
    $('#detail_facility').hide()
    $('#select_facility').hide()
    $('form').trigger('reset');
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

  $('#type').select2({
    placeholder: 'Select',
  }).on('select2:select', function(e){
    let value = e.target.value
    $('#salary').val('').change()
    $('#allowance').val('').change()
    $('#detail_facility').hide()
    if(value == 'salary'){
      getSalary()
    }else{
      getAllowance()
    }
  }).change(function () {
    $(this).valid();
  });
  
  $('#salary').select2({
    placeholder: 'Select'
  }).on('select2:select', function(e){
    let value = e.target.value
    detailSalary(value)
  })

  $('#allowance').select2({
    placeholder: 'Select'
  }).on('select2:select', function(e){
    let value = e.target.value
    detailAllowance(value)
  })

  // DataTable with buttons
  // --------------------------------------------------------------------
  dt_table = table.DataTable({
    responsive: true,
    processing: true,
    serverSide: true,
    order: [[1, 'desc']],
    ajax: {
      url: '/job-level/facility/'+$('#job_level_id').val()+'/data-table',
      method: 'get'
    },
    columns: [
      { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false},
      { data: 'name', sortable: false},
      { data: 'type', render: function(type){
        return type == 'salary' ? '<span class="badge rounded-pill bg-success">Salary</span>' : '<span class="badge rounded-pill bg-success">Allowance</span>'
      } },
      { data: 'nominal', sortable: false, render: function(nominal){
        return priceFormat(nominal)
      } },
      { data: null, className: 'text-center', orderable: false, render: function(row){
          return row.actions.delete ? '<button class="btn btn-icon btn-flat-danger rounded-circle  waves-effect" id="btn-delete" oncLick="confirmDetele('+row.id+')">' +
          feather.icons['trash'].toSvg({ class: 'font-small-4' }) +
          '</button>' : '';
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
      type: {
        required: true
      },
      salary: {
        required: function(){
          return $('#type').val() == 'salary'
        }
      },
      allowance: {
        required: function(){
          return $('#type').val() == 'allowance'
        }
      }
    }
  });

  // Add New record
  form.on('submit', function (e) {
    e.preventDefault();
    
    var isValid = form.valid();

    if(isValid){
      var $type     = $('#type').val(),
          $salary     = $('#salary').val(),
          $allowance     = $('#allowance').val()

      $.ajax({
        url: '/job-level/facility/'+$('#job_level_id').val(),
        type: 'POST',
        data: {
          'type'      : $type,
          'salary'    : $salary,
          'allowance' : $allowance
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
  });

});

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
        url: '/job-level/facility/'+$id,
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

// Get Salary
function getSalary(){
  var $company_id = $('#company').val()
  $('#salary').select2({
    placeholder: 'Select',
    allowClear: true,
    ajax: {
      url: '/select/salary-by-company/'+$company_id,
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

  $('#select_facility').show()
  $('#select_allowance').hide()
  $('#select_salary').show()
}

// Get Allowance
function getAllowance(){
  var $company_id = $('#company').val()
  $('#allowance').select2({
    placeholder: 'Select',
    allowClear: true,
    ajax: {
      url: '/select/allowance-by-company/'+$company_id,
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

  $('#select_facility').show()
  $('#select_salary').hide()
  $('#select_allowance').show()
}

function detailSalary($id){
  $.ajax({
    url: '/salaries/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var item = response.data
        $('#nominal').val(priceFormat(item.nominal))
        $('#detail_facility').show()
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

function detailAllowance($id){
  $.ajax({
    url: '/salary-components/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var item = response.data
        $('#nominal').val(priceFormat(item.nominal))
        $('#detail_facility').show()
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

// Price Format
function priceFormat(nominal)
{
  if (/\D/g.test(nominal)) nominal = nominal.replace(/\D/g,'')
    let value = parseFloat(nominal)
   return value.toLocaleString("id-ID")
}
