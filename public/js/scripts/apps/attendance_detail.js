$(document).ready(function(){
    var table = $('.datatables-basic')

    table.DataTable({
        responsive: true,
        processing: true,
        buttons: [],
        serverSide: true,
        order: [[1, 'desc']],
        dom: '<<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        ajax: {
          url: $(location).attr('href'),
          method: 'get',
          data: function(d){
            d.month = $('#filter_month').select2('val')
          }
        },
        columns: [
          { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false},
          { data: 'date' },
          { data: 'clock_in' },
          { data: 'clock_out' },
          { data: 'late' },
          { data: 'early' },
          { data: 'overtime' },
          { data: 'working_hours' },
          { data: 'symbol' }
        ],
        language: {
          paginate: {
            // remove previous & next text from pagination
            previous: '&nbsp;',
            next: '&nbsp;'
          }
        }
      });
});