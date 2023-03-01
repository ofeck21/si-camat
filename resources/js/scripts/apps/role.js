// Add new role Modal JS
//------------------------------------------------------------------
(function () {
  var form = $('#addRoleForm');

  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  // add role form validation
  if (form.length) {
    form.validate({
      rules: {
        modalRoleName: {
          required: true
        }
      }
    });
  }

  // reset form on modal hidden
  $('.modal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
  });

  // Select All checkbox click
  const selectAll = document.querySelector('#selectAll'),
    checkboxList = document.querySelectorAll('[type="checkbox"]');
    selectAll.addEventListener('change', t => {
      checkboxList.forEach(e => {
        e.checked = t.target.checked;
      });
    });

  // sumbit form
  form.on('submit', function(e){
    e.preventDefault()
    if(form.hasClass('editData')){
      updateData()
    }else{
      var isValid = form.valid();
      if(isValid){
        var permissions = [],
            permissionList = document.querySelectorAll('[type="checkbox"][name="permissions"]');
        permissionList.forEach(e => {
            permissions.push({ 'id': e.id, 'status': e.checked})
        });

        $.ajax({
          url: '/roles',
          type: 'POST',
          data: {
            'role_name'   : $('#role_name').val(),
            'permissions' : permissions
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
          if(error.status == 422){
            var response = error.responseJSON
            for (let [key, value] of Object.entries(response.errors)) {
              $('#'+key).addClass('is-invalid')
              $('#'+key).after(function(){
                return `<span id="role_name-error" class="error">${value}</span>`
              })
            }
          }
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
  })

  // Update Data
function updateData(){
  var isValid = form.valid();

  if(isValid){
      $id       = $('#role_id').val();
      var permissions = [],
      permissionList = document.querySelectorAll('[type="checkbox"][name="permissions"]');
      permissionList.forEach(e => {
          permissions.push({ 'id': e.id, 'status': e.checked})
      });

    $.ajax({
      url: '/roles/'+$id,
      type: 'PUT',
      data: {
        'role_name'   : $('#role_name').val(),
        'permissions' : permissions
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
})();

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
        url: '/roles/'+$id,
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

// Edit Role
function edit($id){
  $.ajax({
    url: '/roles/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var role = response.data, role_name
        if(role.alias != null) { 
          role_name = role.alias
         }else{ 
          role_name = role.name
        }
        if(role.name == 'Administrator'){
          $('#role_name').prop("disabled", true);
        }
        $('.role-title').text('Edit Role')
        $('#role_id').val(role.id);
        $('#role_name').val(role_name)
        $('.btn-submit').text('Update')
        $('#addRoleForm').addClass('editData')

        role.permissions.forEach(function(permission){
          $(`#${permission.id}`).prop('checked', true);
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