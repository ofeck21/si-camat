var dt_table_pic
var $company_id = $('#company_id').val()

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
  

  var table_pic = $('.table-pic'),
    table_file = $('.table-file'),
    formPIC = $('#formPIC'),
    formFile = $('#formFile'),
    select = $('.select2');

  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $('.modal').on('hidden.bs.modal', function(){
    if($(this).hasClass('editData')){
      $(this).removeClass('editData')
      $('form').removeClass('editData')
    }
    $('form').trigger('reset');
  });

  $('#change_large_logo').on('click', function(){
    $('#large_logo').click()
  })

  $('#change_small_logo').on('click', function(){
    $('#small_logo').click()
  })

  $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr("href") 
    if(target == '#file'){
      $('#addNewPIC').hide()
      $('#addNewFile').show()
    }else{
      $('#addNewFile').hide()
      $('#addNewPIC').show()
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
dt_table_pic = table_pic.DataTable({
  responsive: true,
  processing: true,
  buttons: [],
  serverSide: true,
  order: [[1, 'desc']],
  ajax: {
    url: '/company-pic-datatable/'+$company_id,
    method: 'get'
  },
  columns: [
    { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false,},
    { data: 'name' },
    { data: 'phone' },
    { data: 'description' },
    { data: null, className: 'text-center', orderable: false, render: function(row){
        var edit = row.actions.edit ? '<button class="btn btn-icon btn-flat-primary rounded-circle waves-effect" oncLick="editPIC('+row.id+')">' +
        feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
        '</button>' : '';
        var destory = row.actions.delete ? '<button class="btn btn-icon btn-flat-danger rounded-circle  waves-effect" id="btn-delete" oncLick="confirmDetelePIC('+row.id+')">' +
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

dt_table_file = table_file.DataTable({
  responsive: true,
  processing: true,
  buttons: [],
  serverSide: true,
  order: [[1, 'desc']],
  ajax: {
    url: '/company-file-datatable/'+$company_id,
    method: 'get'
  },
  columns: [
    { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false,},
    { data: 'name' },
    { data: 'description' },
    { data: null, className: 'text-center', orderable: false, render: function(row){
      var show = '<a href="/storage/file/company/'+row.file+'" target="_blank" class="btn btn-icon btn-flat-info rounded-circle waves-effect">' +
        feather.icons['eye'].toSvg({ class: 'font-small-4' }) +
        '</a>';
      var edit = row.actions.edit ? '<button class="btn btn-icon btn-flat-primary rounded-circle waves-effect" oncLick="editFile('+row.id+')">' +
        feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
        '</button>' : '';
      var destory = row.actions.delete ? '<button class="btn btn-icon btn-flat-danger rounded-circle  waves-effect" id="btn-delete" oncLick="confirmDeteleFile('+row.id+')">' +
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
  formPIC.validate({
    rules: {
      name: {
        required: true
      },
      phone: {
        number: true,
        maxlength: 12
      }
    }
  });

  formFile.validate({
    rules: {
      name: {
        required: true
      },
      file: {
        required: function(){
          return !formFile.hasClass('editData');
        }
      }
    }
  });

  // Add New PIC
  formPIC.on('submit', function (e) {
    e.preventDefault();
    if(formPIC.hasClass('editData')){
      updatePIC()
    }else{
    var isValid = formPIC.valid();

    if(isValid){
      var $name     = $('#pic_name').val(),
        $phone      = $('#pic_phone').val(),
        $description= $('#pic_description').val()

      $.ajax({
        url: '/company-pic/'+$company_id,
        type: 'POST',
        data: {
          'name'        : $name,
          'phone'       : $phone,
          'description' : $description
        },
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            dt_table_pic.ajax.reload()
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

  // Add New File
  formFile.on('submit', function (e) {
    e.preventDefault();
    if(formFile.hasClass('editData')){
      updateFile(this)
    }else{
    var isValid = formFile.valid();

    if(isValid){
      $.ajax({
        url: '/company-file/'+$company_id,
        type: 'POST',
        enctype: 'multipart/form-data',
        processData: false,  // tell jQuery not to process the data
        contentType: false, 
        data: new FormData(this),
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            dt_table_file.ajax.reload()
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
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'Something went wrong!',
          footer: '<span class="text-danger">'+error.statusText+'</span>',
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
  }
  });

  // Update PIC record
  function updatePIC(){
    var isValid = formPIC.valid();

    if(isValid){
      var $name     = $('#pic_name').val(),
        $phone    = $('#pic_phone').val(),
        $description   = $('#pic_description').val(),
        $id     = $('#pic_id').val()

      $.ajax({
        url: '/company-pic/'+$id,
        type: 'PUT',
        data: {
          'name'    : $name,
          'phone'   : $phone,
          'description'  : $description
        },
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            dt_table_pic.ajax.reload()
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

  // Update File record
  function updateFile(data){
    var isValid = formPIC.valid();

    if(isValid){
      var $id     = $('#file_id').val()

      $.ajax({
        url: '/company-update-file/'+$id,
        type: 'post',
        data: new FormData(data),
        enctype: 'multipart/form-data',
        processData: false,  // tell jQuery not to process the data
        contentType: false, 
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            dt_table_file.ajax.reload()
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
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: 'Something went wrong!',
          footer: '<span class="text-danger">'+error.statusText+'</span>',
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
  }
});

function editPIC($id){
  $.ajax({
    url: '/company-pic/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var item = response.data
        $('#newPIC').addClass('editData')
        $('#formPIC').addClass('editData')
        $('#addNewPICLabel').hide()
        $('#editPICLabel').show()
        $('#pic_name').val(item.name)
        $('#pic_phone').val(item.phone)
        $('#pic_description').val(item.description)
        $('#pic_id').val(item.id)
        $('#newPIC').modal('show')
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

function editFile($id){
  $.ajax({
    url: '/company-file/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var item = response.data
        $('#newFile').addClass('editData')
        $('#formFile').addClass('editData')
        $('#addNewFileLabel').hide()
        $('#editFileLabel').show()
        $('#file_name').val(item.name)
        $('#file_description').val(item.description)
        $('#file_id').val(item.id)
        $('#newFile').modal('show')
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
function confirmDetelePIC($id){
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
        url: '/company-pic/'+$id,
        type: 'delete',
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            dt_table_pic.ajax.reload()
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

function confirmDeteleFile($id){
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
        url: '/company-file/'+$id,
        type: 'delete',
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            dt_table_file.ajax.reload()
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

function updateLargeLogo(){
  if($('#large_logo').val() != ''){
    var $data = new FormData();
    $data.append('file', $('#large_logo')[0].files[0]);
    var $company_id = $('#company_id').val();

    $.ajax({
      url: '/company/'+$company_id+'/large-logo',
      type: 'post',
      enctype: 'multipart/form-data',
      data: $data,
      processData: false,  // tell jQuery not to process the data
      contentType: false, 
      success: function(response){
        if(response.status){
          Toast.fire({
            icon:'success',
            text: response.message
          })
  
          $('#bigLogo').attr('src', response.data)
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
}

function updateSmallLogo(){
  if($('#small_logo').val() != ''){
    var $data = new FormData();
    $data.append('file', $('#small_logo')[0].files[0]);

    $.ajax({
      url: '/company/'+$company_id+'/small-logo',
      type: 'post',
      enctype: 'multipart/form-data',
      data: $data,
      processData: false,  // tell jQuery not to process the data
      contentType: false, 
      success: function(response){
        if(response.status){
          Toast.fire({
            icon:'success',
            text: response.message
          })
  
          $('#smallLogo').attr('src', response.data)
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
}