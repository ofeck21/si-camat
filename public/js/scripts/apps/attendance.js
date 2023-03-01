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
    form = $('#formImport')

  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  $('.modal').on('hidden.bs.modal', function(){
    $('#company').val(0).change();
    $('form').trigger('reset');
  });


  $('#filter_month').select2({
    placeholder: "Filter Month"
  }).on('select2:select', function(){
    month = $('#filter_month').select2('val')
    dt_table.month = month
    dt_table.ajax.reload();
  })

  $('#company.select2').select2({
    placeholder: 'Select Company',
    minimumResultsForSearch: Infinity,
    allowClear: true
  }).change(function(){
    $(this).valid()
  })

  $('#filter_department').select2({
    placeholder: "Filter Department"
  })

  $('#filter_shift').select2({
    placeholder: "Filter Shift"
  })

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
      url: '/attendance-datatable',
      method: 'get',
      data: function(d){
        d.month = $('#filter_month').select2('val'),
        d.company = $('#current_company').val(),
        d.department = $('#filter_department').select2('val'),
        d.shift = $('#filter_shift').select2('val')
      }
    },
    columns: [
      { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false},
      { data: 'employee_id_number' },
      { data: 'name' },
      { data: 'department', render: function(department){
        return department!=null ? department.name+' @ '+(department.company!=null ? department.company.name : '') : ''
      }},
      { data: 'shift', render: function(shift) {
        return shift!=null ? shift.name : ''
      }},
      { data: 'attendances_count'},
      { data: null, className: 'text-center', orderable: false, render: function(row){
        return '<a href="/attendance/'+row.id+'/'+$('#filter_month').select2('val')+'" class="btn btn-icon btn-flat-success rounded-circle waves-effect">' +
          feather.icons['eye'].toSvg({ class: 'font-small-4' }) +
          '</a>'
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
      file: {
        required: true
      },
      company: {
        required: true
      },
    }
  });

  // Add New record
  form.on('submit', function (e) {
    e.preventDefault();
    var isValid = form.valid();
    if(isValid){
      var $formData     = new FormData(this)
      $.ajax({
        url: '/attendance/import',
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
  });
  
  var $current_company = $('#current_company').val()

  if($current_company == ''){
    $('#filter_company').select2({
      placeholder: "Filter Company",
      allowClear: true
    }).on('select2:select', function(e){
      $current_company = e.target.value
      $('#current_company').val($current_company)
      selectDepartment($current_company)
      selectShift($current_company)
      dt_table.ajax.reload()
    }).on('select2:clear', function(){
      $('#current_company').val('')
      $('#filter_department').val('').change();
      $('#filter_shift').val('').change();
      dt_table.ajax.reload()
    })
  }else{
    selectDepartment($current_company)

    selectShift($current_company)
  }
});

function selectDepartment($current_company)
{
  $('#filter_department').select2({
    placeholder: "Filter Department",
    allowClear: true,
    ajax: {
      url: '/select/deparment-by-company/'+$current_company,
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
  }).on('select2:select', function(e){
    dt_table.ajax.reload()
  }).on('select2:clear', function(){
    dt_table.ajax.reload()
  })
}

function selectShift($current_company)
{
  $('#filter_shift').select2({
    placeholder: "Filter Shift",
    allowClear: true,
    ajax: {
      url: '/select/shift-by-company/'+$current_company,
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
  }).on('select2:select', function(e){
    dt_table.ajax.reload()
  }).on('select2:clear', function(){
    dt_table.ajax.reload()
  })
}
