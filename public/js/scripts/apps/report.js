/**
 * DataTables Basic
 */

 var dt_table;

$(document).ready(function(){

  var table = $('.datatables-basic')

  $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

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
      url: '/report-datatable',
      method: 'get'
    },
    columns: [
      { data: 'DT_RowIndex', name: 'DT_RowIndex', sortable: false,},
      { data:'name' },
      { data:'type' },
      { data:'stock' },
      { data: 'description' }
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
