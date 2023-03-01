/**
 * DataTables Basic
 */
$(document).ready(function(){
  
  var table = $('.datatables-basic'),
    assetPath = '../../../app-assets/',
    form = $('#formNewRecord'),
    formUpdate = $('#formUpdateRecord'),
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
      $('.modal-title').text('Add Department')
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
        // $(this).valid();
      });
  });


  // DataTable with buttons
  // --------------------------------------------------------------------
  var dt_table = table.DataTable({
    searching: false, 
    // info: false,
    "bLengthChange": false,

    "columnDefs": [
      { "orderable": false, "targets": [0, 1, 2, 3, 4, 5, 6] }
    ],

    responsive: true,
    processing: true,
    buttons: [],
    serverSide: true,
    order: [[1, 'desc']],
    dom: '<<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    ajax: {
      url: '/employee',
      data: function (d) {
        d.dept = $('.form_departemen').val(),
        d.status = $('.form_status').val()
      },
      method: 'get'
    },
    columns: [
      { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false,},
      { data: 'employee_id_number' },
      { data: 'name' },
      { data: 'company' },
      { data: null ,  render: function(row){
        return   '<a class="text-success" target="_blank" href="https://wa.me/'+row.contact+'">' + row.contact + '</a>'
      }},
      { data: 'employee_status' },
      { data: null, className: 'text-center', orderable: false, render: function(row){
        var show = row.actions.show ? '<a class="btn btn-icon btn-flat-info rounded-circle waves-effect" href="/employee/'+row.id+'">' +
        feather.icons['eye'].toSvg({ class: 'font-small-4' }) +
        '</a>' : '';

        var edit = row.actions.edit ? '<button class="btn btn-icon btn-flat-primary rounded-circle waves-effect" onclick="edit(this)" data_id="'+row.id+'" data-bs-toggle="modal" data-bs-target="#updateRecord" >' +
        feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
        '</button>' : '';
        var destory = row.actions.delete ? '<button class="btn btn-icon btn-flat-danger rounded-circle  waves-effect" id="btn-delete" oncLick="confirmDetele(this)" data_id="'+row.id+'">' +
        feather.icons['trash'].toSvg({ class: 'font-small-4' }) +
        '</button>' : '';
        return (
          show +' '+ edit +' '+destory
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

  
  $('.form_departemen').change(function(){
    dt_table.draw();
  })

  $('.form_status').change(function(){
    dt_table.draw();
  })


  $('.form-control').keyup(function(){
    $(this).removeClass('is-invalid');
    $('.err-'+$(this).attr('name')).remove();
  })

  // update
  formUpdate.on('submit', function (e) {
    e.preventDefault();
    $('.errs').remove();
    var 
        $id                   = $('#edit_id').val(),
        $employee_id          = $('#edit_employee_id').val(),
        $id_card              = $('#edit_id_card').val(),
        $national_number      = $('#edit_national_number').val(),
        $first_name           = $('#edit_first_name').val(),
        $last_name            = $('#edit_last_name').val(),
        $username             = $('#edit_username').val(),
        $email                = $('#edit_email').val(),
        $password             = $('#edit_password').val(),
        $contact_no           = $('#edit_contact_no').val(),
        $address              = $('#edit_address').val(),
        $city                 = $('#edit_city').val(),
        $province             = $('#edit_province').val(),
        $zip_code             = $('#edit_zip_code').val(),
        $country              = $('#edit_country').val(),
        $tribes               = $('#edit_tribes').val(),
        $date_of_birth        = $('#edit_date_of_birth').val(),
        $gender               = $('#edit_gender').val(),
        $marital_status       = $('#edit_marital_status').val(),
        $company_id           = $('#edit_company_id').val(),
        $department_id        = $('#edit_department_id').val(),
        $job_position_id      = $('#edit_job_position_id').val(),
        $job_level_id         = $('#edit_job_level_id').val(),
        // $status_id            = $('#edit_status_id').val(),
        $employee_category_id = $('#edit_employee_category_id').val(),
        $employee_work_status_id      = $('#edit_employee_work_status_id').val(),
        $employee_status_id           = $('#edit_employee_status_id').val(),
        $employment_status_id        = $('#edit_employment_status_id').val(),
        $employment_shift_id          = $('#edit_employment_shift_id').val()

    $.ajax({
      url: '/employee/'+$id,
      type: 'POST',
      data: {
        _method : 'put',
        id : $id,
        employee_id : $employee_id,
        id_card : $id_card,
        national_number : $national_number,
        first_name: $first_name,
        last_name: $last_name,
        username: $username,
        email: $email,
        password : $password,
        contact_no: $contact_no,
        address: $address,
        city: $city,
        province: $province,
        zip_code: $zip_code,
        country: $country,
        tribes : $tribes,
        date_of_birth: $date_of_birth,
        gender: $gender,
        marital_status: $marital_status,
        company_id: $company_id,
        department_id: $department_id,
        job_position_id: $job_position_id,
        job_level_id: $job_level_id,
        // status_id: $status_id,
        employee_category_id : $employee_category_id,
        employee_work_status_id: $employee_work_status_id,
        employee_status_id: $employee_status_id,
        employment_status_id: $employment_status_id,
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
      var errs = error.responseJSON.errors
      Object.keys(errs).forEach(key => {
        $('[name='+key+']').addClass('is-invalid')
        $('[name='+key+']').parent().append('<div class="text-danger errs err-'+key+'"> <small> '+errs[key][0]+' </small> </div>');
      });
    })
    
  
  });


  // Add New record
  form.on('submit', function (e) {
    e.preventDefault();
    $('.errs').remove();
    if(form.hasClass('editData')){
      updateData()
    }else{

    var 
        $employee_id          = $('#employee_id').val(),
        $id_card              = $('#id_card').val(),
        $national_number      = $('#national_number').val(),
        $first_name           = $('#first_name').val(),
        $last_name            = $('#last_name').val(),
        $username             = $('#username').val(),
        $email                = $('#email').val(),
        $password             = $('#password').val(),
        $contact_no           = $('#contact_no').val(),
        $address              = $('#address').val(),
        $city                 = $('#city').val(),
        $province             = $('#province').val(),
        $zip_code             = $('#zip_code').val(),
        $country              = $('#country').val(),
        $tribes               = $('#tribes').val(),
        $date_of_birth        = $('#date_of_birth').val(),
        $gender               = $('#gender').val(),
        $marital_status       = $('#marital_status').val(),
        $company_id           = $('#company_id').val(),
        $department_id        = $('#department_id').val(),
        $job_position_id      = $('#job_position_id').val(),
        $job_level_id         = $('#job_level_id').val(),
        // $status_id            = $('#status_id').val(),
        $employee_category_id = $('#employee_category_id').val(),
        $employee_work_status_id      = $('#employee_work_status_id').val(),
        $employee_status_id           = $('#employee_status_id').val(),
        $employment_status_id        = $('#employment_status_id').val(),
        $employment_shift_id          = $('#employment_shift_id').val()

    $.ajax({
      url: '/employee',
      type: 'POST',
      data: {
        employee_id : $employee_id,
        id_card : $id_card,
        national_number : $national_number,
        first_name: $first_name,
        last_name: $last_name,
        username: $username,
        email: $email,
        password : $password,
        contact_no: $contact_no,
        address: $address,
        city: $city,
        province: $province,
        zip_code: $zip_code,
        country: $country,
        tribes : $tribes,
        date_of_birth: $date_of_birth,
        gender: $gender,
        marital_status: $marital_status,
        company_id: $company_id,
        department_id: $department_id,
        job_position_id: $job_position_id,
        job_level_id: $job_level_id,
        // status_id: $status_id,
        employee_category_id : $employee_category_id,
        employee_work_status_id: $employee_work_status_id,
        employee_status_id: $employee_status_id,
        employment_status_id: $employment_status_id,
        employment_shift_id : $employment_shift_id
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
      var errs = error.responseJSON.errors
      Object.keys(errs).forEach(key => {
        $('[name='+key+']').addClass('is-invalid')
        $('[name='+key+']').parent().append('<div class="text-danger errs err-'+key+'"> <small> '+errs[key][0]+' </small> </div>');
      });
    })
    
  }
})
});



function edit(e){
  var $id = $(e).attr('data_id');
  $.ajax({
    url: '/employee/'+$id,
    type: 'get',
    data:{type : 'json'},
    success: function(response){
        var emp = response.data
        console.log(emp);
        $('#edit_id').val(emp.id)
        $('#edit_employee_id').val(emp.employee_id_number)
        $('#edit_id_card').val(emp.id_card)
        $('#edit_national_number').val(emp.national_number)
        $('#edit_first_name').val(emp.first_name)
        $('#edit_last_name').val(emp.last_name)
        $('#edit_username').val(emp.users.name)
        $('#edit_email').val(emp.users.email)
        $('#edit_contact_no').val(emp.mobile_phone)
        $('#edit_address').val(emp.original_address)
        $('#edit_city').val(emp.city)
        $('#edit_province').val(emp.province)
        $('#edit_zip_code').val(emp.zip_code)
        $('#edit_tribes').val(emp.tribes)
        $('#edit_date_of_birth').val(emp.date_of_birth)

        $('#edit_country').val(emp.country.id).trigger('change')
        $('#edit_gender').val(emp.gender.id).trigger('change')
        $('#edit_marital_status').val(emp.marital_status.id).trigger('change')
        $('#edit_company_id').val(emp.company.id).trigger('change')
        $('#edit_department_id').val(emp.department.id).trigger('change')
        $('#edit_job_position_id').val(emp.job_position.id).trigger('change')
        $('#edit_job_level_id').val(emp.job_levels.id).trigger('change')
        $('#edit_employee_work_status_id').val(emp.employee_work_status.id).trigger('change')
        $('#edit_employee_status_id').val(emp.employee_status.id).trigger('change')
        $('#edit_employment_status_id').val(emp.employment_status.id).trigger('change')
        $('#edit_employee_category_id').val(emp.employee_category.id).trigger('change')
        $('#edit_employment_shift_id').val(emp.shift.shift.id).trigger('change')
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
          url: '/employee/'+$id,
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