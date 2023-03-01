var bpjs_dt_table, pph21_dt_table, pkp_dt_table;

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
    var bpjs_table  = $('.bpjs-datatable'),
        pph21_table = $('.pph21-datatable'),
        pkp_table = $('.pkp-datatable'),
        bpjs_form   = $('#formEditBpjs'),
        pph21_form  = $('#formEditPph21'),
        pkp_form  = $('#formEditPkp'),
        filter_company = $('#filter_company'),
        form_set = $('#formSet')
    
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    // Reset Form Modal
    $('.modal').on('hidden.bs.modal', function(){
      $('form').trigger('reset');
    });

    // Price Format
    $('#ptkp').on('keyup', function(){
      $('#ptkp').val(priceFormat(this.value))
    })

    // Select2
    filter_company.select2({
      placeholder: 'Select Company'
    }).on('select2:select', function(){
      let active_tab = $("ul.nav-tabs  li a.active")[0].hash
      switch (active_tab) {
        case '#bpjs':
          bpjs_dt_table.ajax.reload()
          break;
        case '#pph21':
          pph21_dt_table.ajax.reload()
          break;
        case '#pkp':
          pkp_dt_table.ajax.reload()
          break;
        default:
          break;
      }
    })

    $('#set_company').select2({
      placeholder: 'Select Company',
      dropdownParent: $("#setModal")
    })

    // Event Active Tab
    $('#set_bpjs').show()
    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
      var target = $(e.target).attr("href") 
      if(target == '#bpjs'){
        $('.btn_set').hide()
        $('#set_bpjs').show()
        bpjs_dt_table.ajax.reload()
      }else if(target == '#pph21'){
        $('.btn_set').hide()
        $('#set_ptkp').show()
        pph21_dt_table.ajax.reload()
      }else if(target == '#pkp'){
        $('.btn_set').hide()
        $('#set_pkp').show()
        pkp_dt_table.ajax.reload()
      }
    });

    // on click set button
    $('.btn_set').on('click', function(e){
      let set_id = e.target.id
      if(set_id == 'set_bpjs'){
        $('#setLabel').text('Set BPJS')
        $('#set_id').val(set_id)
      }else if(set_id == 'set_ptkp'){
        $('#setLabel').text('Set PPH21 PTKP')
        $('#set_id').val(set_id)
      }else if(set_id == 'set_pkp'){
        $('#setLabel').text('Set PPH21 PKP')
        $('#set_id').val(set_id)
      }
      $('#setModal').modal('show')
    })

    bpjs_dt_table = bpjs_table.DataTable({
        responsive: true,
        processing: true,
        ajax: {
          url: '/bpjs-datatable',
          method: 'get',
          data: function(d){
            d.company = $('#filter_company').val()
          }
        },
        columns: [
          { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false},
          { data: 'code' },
          { data: 'name'},
          { data: 'employee', render: function(employee){
            return employee+'%'
          }},
          { data: 'company', render: function(company){
            return company+'%'
          }},
          { data: 'total', render: function(total){
            return total+'%'
          }},
          { data: null, className: 'text-center', orderable: false, render: function(row){
            return row.actions.edit ? '<button class="btn btn-icon btn-flat-primary rounded-circle waves-effect" oncLick="editBpjs('+row.id+')">' +
            feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
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

    pph21_dt_table = pph21_table.DataTable({
      responsive: true,
      processing: true,
      ajax: {
        url: '/pph21-datatable',
        method: 'get',
        data: function(d){
          d.company = $('#filter_company').val()
        }
      },
      columns: [
        { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false},
        { data: 'golongan' },
        { data: 'code' },
        { data: 'ptkp', render: function(ptkp){
          return 'Rp. '+priceFormat(ptkp)
        }},
        { data: 'description'},
        { data: null, className: 'text-center', orderable: false, render: function(row){
          return row.actions.edit ? '<button class="btn btn-icon btn-flat-primary rounded-circle waves-effect" oncLick="editPph21('+row.id+')">' +
          feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
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

  pkp_dt_table = pkp_table.DataTable({
    responsive: true,
    processing: true,
    ajax: {
      url: '/pkp-datatable',
      method: 'get',
      data: function(d){
        d.company = $('#filter_company').val()
      }
    },
    columns: [
      { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false},
      { data: 'from', render: function(from){
        return 'Rp. '+priceFormat(from)
      }},
      { data: 'until', render: function(until){
        return until != 0 ? 'Rp. '+priceFormat(until) : '~'
      }},
      { data: 'rate', render: function(rate){
        return rate+'%'
      }},
      { data: 'description'},
      { data: null, className: 'text-center', orderable: false, render: function(row){
        return row.actions.edit ? '<button class="btn btn-icon btn-flat-primary rounded-circle waves-effect" oncLick="editPkp('+row.id+')">' +
        feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
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

  bpjs_form.validate({
    rules: {
      employee: {
        required: true
      },
      company: {
        required: true
      }
    }
  });

  pph21_form.validate({
    rules: {
      ptkp: {
        required: true
      }
    }
  });

  pkp_form.validate({
    rules: {
      from: {
        required: true
      },
      until: {
        required: true
      },
      rate: {
        required: true
      },
      description: {
        required: true
      }
    }
  });

  bpjs_form.on('submit', function (e) {
    e.preventDefault();
    if(bpjs_form.valid()){
      var $employee = $('#employee').val(),
          $company  = $('#company').val(),
          $id       = $('#bpjs_id').val()

      $.ajax({
        url: '/bpjs/'+$id,
        type: 'PUT',
        data: {
          'employee'  : $employee,
          'company'   : $company
        },
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            bpjs_dt_table.ajax.reload()
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

  pph21_form.on('submit', function (e) {
    e.preventDefault();
    if(pph21_form.valid()){
      var $ptkp = $('#ptkp').val(),
          $id       = $('#pph21_id').val()

      $.ajax({
        url: '/pph21/'+$id,
        type: 'PUT',
        data: {
          'ptkp'  : $ptkp
        },
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            pph21_dt_table.ajax.reload()
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

  pkp_form.on('submit', function (e) {
    e.preventDefault();
    if(pkp_form.valid()){
      var $from = $('#from').val(),
          $until = $('#until').val(),
          $rate = $('#rate').val(),
          $description = $('#description').val(),
          $id       = $('#pkp_id').val()

      $.ajax({
        url: '/pkp/'+$id,
        type: 'PUT',
        data: {
          'from'  : $from,
          'until'  : $until,
          'rate'  : $rate,
          'description'  : $description,
        },
        success: function(response){
          if(response.status){
            $('.modal').modal('hide')

            Toast.fire({
              icon:'success',
              text: response.message
            })

            pkp_dt_table.ajax.reload()
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

form_set.validate({
  rules: {
    set_company: {
      required: true
    }
  }
})

form_set.on('submit', function(e){
  e.preventDefault()

  if(form_set.valid()){
    let set_id = $('#set_id').val(),
        company_id = $('#set_company').val()
    if(set_id == 'set_bpjs'){
      setBPJS(company_id)
    }else if(set_id == 'set_ptkp'){
      setPTKP(company_id)
    }else if(set_id == 'set_pkp'){
      setPKP(company_id)
    }
  }
})

});

// modal edit bpjs
function editBpjs($id){
  $.ajax({
    url: '/bpjs/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var bpjs = response.data
        $('#editBpjsLabel').text('Edit '+bpjs.name+' ('+bpjs.code+')')
        $('#employee').val(bpjs.employee)
        $('#company').val(bpjs.company)
        $('#bpjs_id').val(bpjs.id)

        $('#editBpjs').modal('show')
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

// modal edit Pph21
function editPph21($id){
  $.ajax({
    url: '/pph21/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var pph21 = response.data
        $('#editPph21Label').text('Edit '+pph21.golongan+' ('+pph21.code+')')
        $('#ptkp').val(priceFormat(pph21.ptkp))
        $('#pph21_code').val(pph21.code)
        $('#pph21_id').val(pph21.id)

        $('#editPph21').modal('show')
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

// modal edit Pkp
function editPkp($id){
  $.ajax({
    url: '/pkp/'+$id,
    type: 'get',
    success: function(response){
      if(response.status){
        var pkp = response.data
        $('#editPkpLabel').text('Edit '+pkp.description)
        $('#from').val(priceFormat(pkp.from))
        $('#until').val(priceFormat(pkp.until))
        $('#rate').val(pkp.rate)
        $('#description').val(pkp.description)
        $('#pkp_id').val(pkp.id)

        $('#editPkp').modal('show')
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

// Set BPJS
function setBPJS(company_id){
  $.ajax({
    url: '/setting/bpjs',
    type: 'POST',
    data: {
      'company'  : company_id
    },
    success: function(response){
      if(response.status){
        $('.modal').modal('hide')

        Toast.fire({
          icon:'success',
          text: response.message
        })

        bpjs_dt_table.ajax.reload()
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

// Set PTKP
function setPTKP(company_id){
  $.ajax({
    url: '/setting/ptkp',
    type: 'POST',
    data: {
      'company'  : company_id
    },
    success: function(response){
      if(response.status){
        $('.modal').modal('hide')

        Toast.fire({
          icon:'success',
          text: response.message
        })

        pph21_dt_table.ajax.reload()
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

// Set PKP
function setPKP(company_id){
  $.ajax({
    url: '/setting/pkp',
    type: 'POST',
    data: {
      'company'  : company_id
    },
    success: function(response){
      if(response.status){
        $('.modal').modal('hide')

        Toast.fire({
          icon:'success',
          text: response.message
        })

        pkp_dt_table.ajax.reload()
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