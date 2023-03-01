/**
 * DataTables Basic
 */
$(document).ready(function(){
  
  var table = $('.datatables-basic'),
    assetPath = '../../../app-assets/',
    form = $('#formNewRecord'),
    formUpdate = $('#formUpdateRecord');
    // select = $('.select2')
    // ;

  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  // $('.modal').on('hidden.bs.modal', function(){
  //   if($(this).hasClass('editData')){
  //     $(this).removeClass('editData')
  //     $('.modal-title').text('Add Department')
  //     $('form').removeClass('editData')
  //     $('form').trigger('reset');
  //   }
  // });

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
  //     .change(function () {
  //       // $(this).valid();
  //     });
  // });


  // DataTable with buttons
  // --------------------------------------------------------------------
  var dt_table = table.DataTable({
    // searching: false, 
    info: false,
    "bLengthChange": false,

    // "columnDefs": [
    //   { "orderable": false, "targets": [0, 1, 2, 3, 4, 5, 6] }
    // ],

    responsive: true,
    processing: true,
    buttons: [],
    serverSide: true,
    order: [[1, 'desc']],
    dom: '<<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    ajax: {
      url: '/recruitments',
      data: function (d) {
        d.dept = $('.form_departemen').val(),
        d.status = $('.form_status').val()
      },
      method: 'get'
    },
    columns: [
      { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false,},
      { data: 'nik'},
      { data: 'name' },
      { data: null ,  render: function(row){
        return   '<a class="text-success" target="_blank" href="https://wa.me/'+row.contact+'">' + row.contact + '</a>'
      }},
      { data: null, render : function(row) {
        if (row.status == '0') {
          return '<span class="badge rounded-pill  badge-light-danger"> Ditolak </span>';
        }else if (row.status == null) {
          return '<span class="badge rounded-pill  badge-light-info"> New </span>';
        }else{
          return '<span class="badge rounded-pill  badge-light-success"> Acc </span>';
        }

        // return row.status;
      }},
      { data: null, className: 'text-center', orderable: false, render: function(row){
        var show = row.actions.show ? '<a class="btn btn-icon btn-flat-info rounded-circle waves-effect" href="/recruitments/'+row.id+'">' +
        feather.icons['eye'].toSvg({ class: 'font-small-4' }) +
        '</a>' : '';

        var edit = row.actions.edit ? '<button class="btn btn-icon btn-flat-primary rounded-circle waves-effect" onclick="edit(this)" status="'+row.status+'" data_id="'+row.id+'" >' +
        feather.icons['user-check'].toSvg({ class: 'font-small-4' }) +
        '</button>' : '';

        var destory = row.actions.delete ? '<button class="btn btn-icon btn-flat-danger rounded-circle  waves-effect" id="btn-delete" oncLick="confirmDetele(this)" data_id="'+row.id+'">' +
        feather.icons['trash'].toSvg({ class: 'font-small-4' }) +
        '</button>' : '';
        
        var print = row.actions.print ? '<a class="btn btn-icon btn-flat-info rounded-circle waves-effect" href="/recruitments/'+row.id+'/print">' +
        feather.icons['printer'].toSvg({ class: 'font-small-4' }) +
        '</a>' : '';

        return (
          show +' '+ edit +' '+destory + ' ' + print
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




//   // Add New record
  form.on('submit', function (e) {
    e.preventDefault();
    $('.errs').remove();
    var  $employee_id          = $('#employee_id').val();

    $.ajax({
      url: '/recruitments',
      type: 'POST',
      data: {
        employee_id : $employee_id,
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
    })
  })
});





// Action Delete
function confirmDetele(e){
  var $id = $(e).attr('data_id');
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
          url: '/recruitments/'+$id,
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
            
        })
      }
    });
}