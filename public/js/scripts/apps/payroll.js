var dt_table, formPayroll, filterMonth, filterCompany, filterDepartmnet

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
        filterMonth = $('#filter_month'),
        filterCompany = $('#filter_company'),
        filterDepartmnet = $('#filter_department'),
        formPayroll = $('#formRunPayroll')

    $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    // Check Payroll Progress
    progress('first')

    // select2
    // select.each(function () {
    //   var $this = $(this);
    //   $this.wrap('<div class="position-relative"></div>');
    //   $this
    //     .select2({
    //       placeholder: 'Select',
    //       width: '100%',
    //       dropdownAutoWidth: true,
    //       dropdownParent: $this.parent(),
    //       allowClear: true
    //     })
        // .change(function () {
        //   $(this).valid();
        // });
    // });

    // Filter Month
    filterMonth.select2()

    // Filter Company
    filterCompany.select2()

    filterDepartmnet.select2()

    // Select Month
    $('#month').select2({
      placeholder: 'Select Month',
      dropdownParent: $('#month').parent()
    }).change(function(){
      $(this).valid()
    })

    // Select Company
    $('#company.select2').select2({
      placeholder: 'Select Company',
      dropdownParent: $('#company.select2').parent()
    }).on('select:select', function(e){
      var $company = e.target.value
      // select department by company
      getDepartment($company)
    }).change(function(){
      $(this).valid()
    })

    // Select Department
    $('#department.select2').select2({
      placeholder: 'Select Department',
      dropdownParent: $('#department.select2').parent()
    }).on('select2:select', function(e){
      var $department = e.target.value
      // select employee
      selectEmployees($department)
    })

    // Select employees
   $('#employees.select2').select2({
    placeholder: 'Select Department Before',
    dropdownParent: $('#employees.select2').parent()
   })
    
    dt_table = table.DataTable({
      responsive: true,
      processing: true,
      serverSide: true,
      ajax: {
        url: '/payroll-datatable',
        method: 'get'
      },
      columns: [
        { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false},
        { data: 'date' },
        { data: 'name', sortable: false },
        { data: 'company_department', sortable: false },
        { data: 'job', sortable: false },
        { data: 'nominal', render: function(nominal){
          return 'Rp '+priceFormat(nominal)+',-'
        } },
        { data: null, className: 'text-center', orderable: false, render: function(row){
          var show ='<a href="/payroll/'+row.id+'/detail" class="btn btn-icon btn-flat-success rounded-circle waves-effect">' +
            feather.icons['eye'].toSvg({ class: 'font-small-4' }) +
            '</a>';
          var edit = row.actions.edit ? '<a href="/payroll/'+row.id+'/edit" class="btn btn-icon btn-flat-primary rounded-circle waves-effect">' +
          feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
          '</a>' : '';
          var destory = row.actions.delete ? '<button class="btn btn-icon btn-flat-danger rounded-circle  waves-effect" id="btn-delete" oncLick="confirmDetele('+row.id+')">' +
          feather.icons['trash'].toSvg({ class: 'font-small-4' }) +
          '</button>' : '';
        return (
          show +' '+ edit +' '+destory
        );
          return (
            show+' '+edit
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
    formPayroll.validate({
      rules: {
        month: {
          required: true
        },
        company: {
          required: true
        },
      }
    });

    formPayroll.on('submit', function(e){
      e.preventDefault();
      if(formPayroll.valid()){
        checkPayroll('run')
      }
    })

    $('#btn-finish').on('click', function(){
      var $payroll_id = $(this).data('payroll')

      Swal.fire({
        title: 'Are you sure?',
        text: "You will finish payroll!",
        icon: 'warning',
        showCancelButton: !0,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        buttonsStyling: !1,
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger ms-1',
        }
      }).then(function (t) {
        if(t.value){
          finishPayroll($payroll_id)
         }
      });
    })
}); //End Document raeady

// Price Format
function priceFormat(nominal)
{
  if (/\D/g.test(nominal)) nominal = nominal.replace(/\D/g,'')
    let value = parseFloat(nominal)
   return value.toLocaleString("id-ID")
}

var $interval;

function progress($type = 'first') {
  if($type == 'run'){
    var $month = $('#month').val(),
        $company = $('#company').val()
  }else{
    var $month = $('#filter_month').val(),
        $company = $('#filter_company').val()
  }
  
  $interval = setInterval(function(){
    $.ajax({
      url: '/payroll/progress',
      type: 'GET',
      data: {
        'month'      : $month,
        'company'    : $company      
      },
      success: function(response){
        if(response.status){
          if(response.progress == 'process'){
            $('#btn-run').hide()
            $('#btn-finish').hide()
            $('#btn-progress').show()
            $('.executed').text(response.executed)
            $('.total').text(response.total)
            $('.percent').text(response.percent)
          }else if(response.progress == 'done'){
            $('#btn-run').hide()
            $('#btn-progress').hide()
            $('#btn-finish').show()
            $('#btn-finish').attr('data-payroll', response.payroll)
            stopInterval()
          }else if(response.progress == 'finish'){
            $('#btn-run').show()
            $('#btn-finish').hide()
            $('#btn-progress').hide()
            $('.executed').text('0')
            $('.total').text('0')
            $('.percent').text('0')
            stopInterval()
          }
        }else{
          $('#btn-run').show()
          $('#btn-finish').hide()
          $('#btn-progress').hide()
          $('.executed').text('0')
          $('.total').text('0')
          $('.percent').text('0')
          console.log(response.message);
          stopInterval()
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
    }) // End Ajax
  }, 2000) // End Set Inteverval
}

function stopInterval() {
  clearInterval($interval)
}

function checkPayroll($type) {
  if($type == 'run'){
    var $month = $('#month').val(),
        $company = $('#company').val()
  }else{
    var $month = $('#filter_month').val(),
        $company = $('#filter_company').val()
  }

  $.ajax({
    url: '/payroll/progress',
    type: 'GET',
    data: {
      'month'      : $month,
      'company'    : $company      
    },
    success: function(response){
      if(response.status){
        Swal.fire({
          title: 'Are you sure you want to run payroll again?',
          text: "Payroll has already been run!",
          icon: 'warning',
          showCancelButton: !0,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!',
          buttonsStyling: !1,
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger ms-1',
          }
        }).then(function (t) {
          if(t.value){
            // open modal run payroll
            runPayroll()
           }
        });
      }else{
        //open modalr un payroll
        runPayroll()
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
  }) // End Ajax
}

function finishPayroll($payroll_id) {
  $.ajax({
    url: '/payroll/finish/'+$payroll_id,
    type: 'POST',
    success: function(response){
      if(response.status){
        Toast.fire({
          icon:'success',
          text: response.message
        })

        $("#btn-finish").hide()
        $("#btn-run").show()
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
  }) // End Ajax
}

function runPayroll() {
    var $month = $('#month').val(),
        $company = $('#company').val(),
        $department = $('#department').val(),
        $employees = $('#employees').select().value       
  
    $.ajax({
      url: '/payroll/run',
      type: 'POST',
      data: {
        'month'         : $month,
        'company_id'    : $company,
        'department'    : $department,
        'employees'     : $employees      
      },
      success: function(response){
        if(response.status){
          $('.modal').modal('hide')

          Toast.fire({
            icon:'success',
            text: response.message
          })

          progress('run')
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
    }) // End Ajax
}

// select employees
function selectEmployees($department_id){
  $('#employees.select2').select2({
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
}

function getDepartment($company_id){
  $('#department').select2({
    placeholder: 'Select Department',
  })
}