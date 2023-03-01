/**
 * DataTables Basic
 */

$(document).ready(function(){
  
  var table = $('.datatables-basic'),
    assetPath = '../../../app-assets/',
    form = $('#formNewRecord'),
    timePickr = $('.flatpickr-time'),
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
    if($(this).hasClass('editData')){
      $(this).removeClass('editData')
      $('.modal-title').text('Add New Shift')
      $('form').removeClass('editData')
      $('#company').val(0).change();
      $('form').trigger('reset');
    }
  });

  // Time
  if (timePickr.length) {
    timePickr.flatpickr({
      enableTime: true,
      noCalendar: true,
      allowInput: true
    });
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


  // DataTable with buttons
  // --------------------------------------------------------------------
  var dt_table = table.DataTable({
    responsive: true,
    processing: true,
    buttons: [],
    serverSide: true,
    order: [[1, 'desc']],
    dom: '<<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    ajax: {
      url: '/shift-datatable',
      method: 'get'
    },
    columns: [
      { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false},
      { data: 'name' },
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
      company: {
        required: true
      },
      limit: {
        required: function(){
          return $('#allow_overtime').val() == 'yes'
        },
        number: true,
        max:24
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
          $allow_overtime = $('#allow_overtime').val(),
          $overtime_limit = $('#limit').val(),
          $clock_in0  = $('#clock_in0').val(),
          $clock_out0  = $('#clock_out0').val(),
          $clock_in1  = $('#clock_in1').val(),
          $clock_out1  = $('#clock_out1').val(),
          $clock_in2  = $('#clock_in2').val(),
          $clock_out2  = $('#clock_out2').val(),
          $clock_in3  = $('#clock_in3').val(),
          $clock_out3  = $('#clock_out3').val(),
          $clock_in4  = $('#clock_in4').val(),
          $clock_out4  = $('#clock_out4').val(),
          $clock_in5  = $('#clock_in5').val(),
          $clock_out5  = $('#clock_out5').val(),
          $clock_in6  = $('#clock_in6').val(),
          $clock_out6  = $('#clock_out6').val()

      $.ajax({
        url: '/shift',
        type: 'POST',
        data: {
          'name'          : $name,
          'company_id'    : $company,
          'allow_overtime': $allow_overtime=='yes' ? 1 : 0,
          'overtime_limit': $overtime_limit,
          'days'          : new Array(
              {
                'name'      : 'Sunday',
                'clock_in'  : $clock_in0,
                'clock_out' : $clock_out0
              },
              {
                'name'      : 'Monday',
                'clock_in'  : $clock_in1,
                'clock_out' : $clock_out1
              },
              {
                'name'      : 'Tuesday',
                'clock_in'  : $clock_in2,
                'clock_out' : $clock_out2
              },
              {
                'name'      : 'Wednesday',
                'clock_in'  : $clock_in3,
                'clock_out' : $clock_out3
              },
              {
                'name'      : 'Thursday',
                'clock_in'  : $clock_in4,
                'clock_out' : $clock_out4
              },
              {
                'name'      : 'Friday',
                'clock_in'  : $clock_in5,
                'clock_out' : $clock_out5
              },
              {
                'name'      : 'Saturday',
                'clock_in'  : $clock_in6,
                'clock_out' : $clock_out6
              }
          )
          
        },
        success: function(response){
          if(response.status){
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.message,
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            }).then(function(){
              window.location.reload();
            });
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
      var $name         = $('#name').val(),
        $id             = $('#item_id').val(),
        $company        = $('#company').val(),
        $allow_overtime = $('#allow_overtime').val(),
        $overtime_limit = $('#limit').val(),
        $clock_in_id0   = $('#clock_in0').attr('data-id'),
        $clock_in0      = $('#clock_in0').val(),
        $clock_out0     = $('#clock_out0').val(),
        $clock_in_id1   = $('#clock_in1').attr('data-id'),
        $clock_in1      = $('#clock_in1').val(),
        $clock_out1     = $('#clock_out1').val(),
        $clock_in_id2   = $('#clock_in2').attr('data-id'),
        $clock_in2      = $('#clock_in2').val(),
        $clock_out2     = $('#clock_out2').val(),
        $clock_in_id3   = $('#clock_in3').attr('data-id'),
        $clock_in3      = $('#clock_in3').val(),
        $clock_out3     = $('#clock_out3').val(),
        $clock_in_id4   = $('#clock_in4').attr('data-id'),
        $clock_in4      = $('#clock_in4').val(),
        $clock_out4     = $('#clock_out4').val(),
        $clock_in_id5   = $('#clock_in5').attr('data-id'),
        $clock_in5      = $('#clock_in5').val(),
        $clock_out5     = $('#clock_out5').val(),
        $clock_in_id6   = $('#clock_in6').attr('data-id'),
        $clock_in6      = $('#clock_in6').val(),
        $clock_out6     = $('#clock_out6').val()

      $.ajax({
        url: '/shift/'+$id,
        type: 'PUT',
        data: {
          'name'          : $name,
          'company_id'    : $company,
          'allow_overtime': $allow_overtime=='yes' ? 1 : 0,
          'overtime_limit': $overtime_limit,
          'days'          : new Array(
              {
                'id'        : $clock_in_id0,
                'clock_in'  : $clock_in0,
                'clock_out' : $clock_out0
              },
              {
                'id'        : $clock_in_id1,
                'clock_in'  : $clock_in1,
                'clock_out' : $clock_out1
              },
              {
                'id'        : $clock_in_id2,
                'clock_in'  : $clock_in2,
                'clock_out' : $clock_out2
              },
              {
                'id'        : $clock_in_id3,
                'clock_in'  : $clock_in3,
                'clock_out' : $clock_out3
              },
              {
                'id'        : $clock_in_id4,
                'clock_in'  : $clock_in4,
                'clock_out' : $clock_out4
              },
              {
                'id'        : $clock_in_id5,
                'clock_in'  : $clock_in5,
                'clock_out' : $clock_out5
              },
              {
                'id'        : $clock_in_id6,
                'clock_in'  : $clock_in6,
                'clock_out' : $clock_out6
              }
          )
        },
        success: function(response){
          if(response.status){
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.message,
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            }).then(function(){
              window.location.reload();
            });
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
  
  $('#overtime_limit').hide();
  $('#allow_overtime').on('change', function(){
    if ($(this).val() == 'yes') {
      $('#overtime_limit').show()
    }else{
      $('#overtime_limit').hide();
    }
  })
});

function edit($id){
  $.ajax({
    url: '/shift/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var item = response.data
        $('#formNewRecord').addClass('editData')
        $('.modal').addClass('editData')
        $('#addNewRecordLabel').text('Edit Shift')
        $('#item_id').val(item.id)
        $('#name').val(item.name)
        $('#limit').val(item.overtime_limit)
        $('#allow_overtime').val(item.allow_overtime ? 'yes' : 'no').change()
        $('#company').val(item.company_id).change()
        item.shift_times.forEach(function(time){
          $('#clock_in'+time.day_num).val(time.clock_in != null ? String(time.clock_in).slice(0, -3) : '')
          $('#clock_in'+time.day_num).attr('data-id', time.id)
          $('#clock_out'+time.day_num).val(time.clock_out != null ? String(time.clock_out).slice(0, -3) : '')
        })
        
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
        url: '/shift/'+$id,
        type: 'delete',
        success: function(response){
          if(response.status){
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.message,
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            }).then(function(){
              window.location.reload();
            });
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
