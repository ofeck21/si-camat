var dt_table

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
        select = $('.select2'),
        runPayroll = $('#formRunPayroll')

    $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
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
        // .change(function () {
        //   $(this).valid();
        // });
    });
    
    dt_table = table.DataTable({
      responsive: true,
      processing: true,
      serverSide: true,
      ajax: {
        url: '/payment-datatable',
        method: 'get'
      },
      columns: [
        { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false},
        { data: 'date' },
        { data: 'employee', sortable: false, render: function(row){
          return row.employee_id
        }},
        { data: 'name', sortable: false },
        { data: 'nominal', render: function(nominal){
          return 'Rp '+priceFormat(nominal)+',-'
        } },
        { data: 'code', sortable: false},
        { data: 'bank_name', sortable: false},
        { data: 'bank_account', sortable: false},
        { data: 'status' },
        // { data: null, className: 'text-center', orderable: false, render: function(row){
        //   var show ='<a href="/payroll/'+row.id+'/detail" class="btn btn-icon btn-flat-success rounded-circle waves-effect">' +
        //     feather.icons['eye'].toSvg({ class: 'font-small-4' }) +
        //     '</a>';
        //   var edit ='<a href="/payroll/'+row.id+'/edit" class="btn btn-icon btn-flat-primary rounded-circle waves-effect">' +
        //   feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
        //   '</a>';
        //   return (
        //     show+' '+edit
        //   );
          // } 
        // }
      ],
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      }
    });

}); //End Document raeady

// Price Format
function priceFormat(nominal)
{
  if (/\D/g.test(nominal)) nominal = nominal.replace(/\D/g,'')
    let value = parseFloat(nominal)
   return value.toLocaleString("id-ID")
}