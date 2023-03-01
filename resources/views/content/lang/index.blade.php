@extends('layouts/contentLayoutMaster')

@section('title', lang('Menu Language Settings'))

@section('vendor-style')
  {{-- vendor css files --}}
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/dataTables.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/responsive.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/buttons.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/rowGroup.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
  <link rel="stylesheet" href="{{asset('css/base/pages/ui-feather.css')}}">
@endsection
  
@section('page-style')
<style>
  .w-1{
    width: 1% !important;
  }
  .w-10{
    width: 10% !important;
  }
  .w-30{
    width: 30% !important;
  }
  .w-59{
    width: 59% !important;
  }
  .px-1{
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }
  .px-0{
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
</style>
  {{-- Page Css files --}}
  {{-- <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}"> --}}
  {{-- <link rel="stylesheet" href="{{asset(mix('css/base/plugins/extensions/ext-component-sweet-alerts.css'))}}"> --}}
@endsection

@section('content')
<!-- Basic table -->
<section id="basic-datatable">
  <div class="row">
    <div class="col-12">
      <div class="card">
        @can('create Language')
          <div class="card-header border-bottom p-1">
              <div style="float: left">
                <button type="button" class="btn btn-outline-primary waves-effect" data-bs-toggle="modal" data-bs-target="#addNewRecord">
                  <i data-feather="plus"></i> {{lang('Language Add New')}}
                </button>
              </div>
              <div style="float: right">
                <button type="button" data-bs-toggle="modal" data-bs-target="#editRecord" style="display: none" class="btn btn-outline-primary set-value check-btn-edit waves-effect" locale="" language="" id="">
                  <i data-feather="edit"></i> {{lang('Language edit')}} <span class="atur-bahasa"> </span>
                </button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#deleteRecord" style="display: none" class="btn btn-outline-primary set-value check-btn-delete waves-effect" locale="" language="" id="">
                  <i data-feather="trash"></i> {{lang('Language Delete')}} <span class="atur-bahasa"> </span>
                </button>
                <button type="button" style="display: none" class="btn btn-set btn-outline-primary set-value check-btn-active waves-effect" locale="" language="" id="">
                  <i data-feather="check"></i> {{lang('Language Set')}} <span class="atur-bahasa"> </span>
                </button>
              </div>
          </div>
        @endcan
        

        <div class="card-body">
          
          <ul class="nav nav-tabs" role="tablist">
            @foreach ($data as $key => $item)
              <li class="nav-item">
                <button type="button" class="nav-link set-language {{($item->status == 1)? 'active': ''}}" data-table="#language-{{$item->locale}}" edit="{{$item->edit}}" delete="{{$item->delete}}" lang="{{$item->lable}}" locale="{{$item->locale}}" data-id="{{$item->id}}" id="{{$item->locale}}-tab" data-bs-toggle="tab" data-bs-target="#{{$item->locale}}" aria-controls="home" role="tab" aria-selected="true"><i data-feather="twitch"></i> {{$item->lable}}</button>
              </li>
            @endforeach
          </ul>
          <div class="tab-content">
            @foreach ($data as $key => $item)
              <div class="tab-pane {{($item->status == 1)? 'active': ''}}" id="{{$item->locale}}" aria-labelledby="{{$item->locale}}-tab" role="tabpanel">
                <div class="card-datatable">
                  <table class="datatables-basic languages table">
                    <thead>
                      <tr>
                        <th class="w-1 px-0 text-center"></th>
                        <th class="w-10 px-1">Key</th>
                        <th class="w-30 px-1">{{$item->lable}}</th>
                        <th class="w-59 px-1">Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      @foreach ($item->lang as $k => $lang)
                        @if ($lang->value)
                          <tr>
                            <td class="px-0 text-center">{{$k + 1}}</td>
                            <td class="px-1">{{$lang->key}}</td>
                            <td class="px-1 set-value">{{$lang->value}}</td>
                            <td class="px-0">
                              <textarea name="edit" rows="1" style="width: 100%" value="{{$lang->value}}" id="{{$lang->id}}" class="form-control edit-lang">{{$lang->value}}</textarea>
                            </td>
                          </tr>
                        @else
                          <tr class="table-secondary">
                            <td class="px-0 text-center"><b>{{$k + 1}}</b></td>
                            <td class="py-2 px-1"><b>{{$lang->key}}</b></td>
                            <td></td>
                            <td></td>
                          </tr>
                        @endif
                      @endforeach
                    </tbody>
                  </table>
                </div>
              </div>

              
            @endforeach
          </div>
      </div>


      </div>
    </div>
  </div>

</section>



<div class="modal fade text-start" id="deleteRecord" tabindex="-1" aria-labelledby="addNewRecord" style="display: none;" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="addNewRecordLabel">{{lang('Language Add Language')}}</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
        <input type="hidden" name="id">
        <input type="hidden"name="locale">
        <input type="hidden" name="language">
        <h3>Anda yakin akan menghapus data ini ? </h3>
        <div class="text-danger">Data yang sudah dihapus tidak dapat dikembalikan</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary waves-effect waves-float waves-light" data-bs-dismiss="modal"><i data-feather="x"></i> Close</button>
        <button type="button" class="btn btn-outline-primary waves-effect waves-float waves-light data-delete"><i data-feather="save"></i> Save</button>
      </div>

    </div>
  </div>
</div>

<div class="modal fade text-start" id="editRecord" tabindex="-1" aria-labelledby="addNewRecord" style="display: none;" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="addNewRecordLabel">{{lang('Language Add Language')}}</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
        <div class="row mb-2">
          <div class="col">
              <input type="hidden" name="id">
              <label class="form-label"> {{lang('Language Locale')}} <span class="text-danger">*</span></label>
              <input type="text" class="form-control" placeholder="en, id , dll" name="locale">
          </div>
        </div>

        <div class="row mb-2">
          <div class="col">
              <label class="form-label"> {{lang('Language Lable')}} <span class="text-danger">*</span></label>
              <input type="text" class="form-control" placeholder="{{lang('Language Lable')}}" name="language">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary waves-effect waves-float waves-light" data-bs-dismiss="modal"><i data-feather="x"></i> Close</button>
        <button type="button" class="btn btn-outline-primary waves-effect waves-float waves-light data-edit"><i data-feather="save"></i> Save</button>
      </div>

    </div>
  </div>
</div>


<div class="modal fade text-start" id="addNewRecord" tabindex="-1" aria-labelledby="addNewRecord" style="display: none;" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="addNewRecordLabel">{{lang('Language Add Language')}}</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
        <div class="modal-body">
          <div class="row mb-2">
            <div class="col">
                <label class="form-label"> {{lang('Language Locale')}} <span class="text-danger">*</span></label>
                <input type="text" class="form-control" placeholder="en, id , dll" name="locale">
            </div>
          </div>

          <div class="row mb-2">
            <div class="col">
                <label class="form-label"> {{lang('Language Lable')}} <span class="text-danger">*</span></label>
                <input type="text" class="form-control" placeholder="{{lang('Language Lable')}}" name="language">
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
                <label class="form-label"> {{lang('Set Default Value')}} </label>
                <select name="default" class="form-control select2">
                  <option value=""> -- {{lang('Set Default Value')}} -- </option>
                  @foreach ($data as $key => $item)
                    <option value="{{$item->id}}"> {{$item->lable}} </option>
                  @endforeach
                </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary waves-effect waves-float waves-light" data-bs-dismiss="modal"><i data-feather="x"></i> Close</button>
          <button type="button" class="btn btn-outline-primary waves-effect waves-float waves-light data-save"><i data-feather="save"></i> Save</button>
        </div>
    </div>
  </div>
</div>

<!--/ Basic table -->
@endsection


@section('vendor-script')
  {{-- vendor files --}}
  <script src="{{ asset(mix('vendors/js/tables/datatable/jquery.dataTables.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.bootstrap5.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.responsive.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/responsive.bootstrap5.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/datatables.checkboxes.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/datatables.buttons.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/jszip.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/pdfmake.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/vfs_fonts.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/tables/datatable/buttons.html5.min.js')) }}"></script>
  {{-- <script src="{{ asset(mix('vendors/js/tables/datatable/buttons.print.min.js')) }}"></script> --}}
  <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.rowGroup.min.js')) }}"></script>
  {{-- <script src="{{ asset(mix('vendors/js/forms/select/select2.full.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script> --}}
  <script>
    $(document).ready(function(){

      $('.data-save').click(function(){
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
          }
        });
        var formData = new FormData();
        formData.append('language' , $('#addNewRecord [name=language]').val())
        formData.append('default' , $('#addNewRecord [name=default]').val())
        formData.append('locale' , $('#addNewRecord [name=locale]').val())
        
        $.ajax({
          url : '/languages',
          type : 'post',
          data : formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false,  // tell jQuery not to set contentType
          enctype: 'multipart/form-data',
          success : function(data){
            window.location.reload()
          },
          error : function(err){
            console.log(err);
          }
        })
      })

      $('.data-edit').click(function(){
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
          }
        });
        var formData = new FormData();
        formData.append('language' , $('#editRecord [name=language]').val())
        formData.append('locale' , $('#editRecord [name=locale]').val())
        formData.append('id' , $('#editRecord [name=id]').val())
        
        $.ajax({
          url : '/languages-update',
          type : 'post',
          data : formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false,  // tell jQuery not to set contentType
          enctype: 'multipart/form-data',
          success : function(data){
            window.location.reload()
          },
          error : function(err){
            console.log(err);
          }
        })
      })


      $('.data-delete').click(function(){
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
          }
        });
        var formData = new FormData();
        formData.append('id' , $('#deleteRecord [name=id]').val())
        formData.append('locale' , $('#deleteRecord [name=locale]').val())
        formData.append('language' , $('#deleteRecord [name=language]').val())
        
        $.ajax({
          url : '/languages-detete',
          type : 'post',
          data : formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false,  // tell jQuery not to set contentType
          enctype: 'multipart/form-data',
          success : function(data){
            window.location.reload()
          },
          error : function(err){
            console.log(err);
          }
        })
      })

      

      $(".languages").DataTable({
        "pageLength": 100
      })

      $('.btn-set').click(function(){
        var id = $(this).attr('id')
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
          }
        });
        var formData = new FormData();
        formData.append('id' ,id)
        
        $.ajax({
          url : '/set-language',
          type : 'post',
          data : formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false,  // tell jQuery not to set contentType
          enctype: 'multipart/form-data',
          success : function(data){
            window.location.reload()
          },
          error : function(err){
            console.log(err);
          }
        })
      })

      
      $('.check-btn-delete').click(function(){
        var lang = $(this).attr('language')
        var locale = $(this).attr('locale')
        var id = $(this).attr('id')
        $('#deleteRecord [name=locale]').val(locale)
        $('#deleteRecord [name=language]').val(lang)
        $('#deleteRecord [name=id]').val(id)
      });
      $('.check-btn-edit').click(function(){
        var lang = $(this).attr('language')
        var locale = $(this).attr('locale')
        var id = $(this).attr('id')
        $('#editRecord [name=locale]').val(locale)
        $('#editRecord [name=language]').val(lang)
        $('#editRecord [name=id]').val(id)
      });

      $('.set-language').click(function(){
        $('.atur-bahasa').html($(this).attr('lang'));
        $('.set-value').attr('id', $(this).attr('data-id'))
        $('.set-value').attr('locale', $(this).attr('locale'))
        $('.set-value').attr('language', $(this).attr('lang'))
        var d = $(this).attr('delete');
        $('.check-btn-edit').show()
        $('.check-btn-delete').show()
        $('.check-btn-active').show()
        if (d == 'n') {
          $('.check-btn-delete').hide()
        }
      })

      $('.edit-lang').focusout(function(){
        var val = $(this).val()
        var values = $(this).attr('value')
        var id = $(this).attr('id')
        var app = $(this);
        $('.ok').remove();
        if (val != values) {
          $(this).attr('value', val)
          $.ajaxSetup({
            headers: {
              'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
          });
          var formData = new FormData();
          formData.append('value' ,val)
          formData.append('id' ,id)
          
          $.ajax({
            url : '/languages/'+id,
            type : 'post',
            data : formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            enctype: 'multipart/form-data',
            success : function(data){
              app.addClass('is-valid')
              
              app.parent().parent().children('.set-value').html(val)
              app.parent().parent().children('.set-value').addClass('text-success')
              app.parent().append('<div class="ok text-muted"><small>'+values+' : Berhasil diperbarui menjadi : '+val+'</small></div>')
              setTimeout(() => {
                $('.ok').remove();
                app.parent().parent().children('.set-value').removeClass('text-success')
                app.removeClass('is-valid')
              }, 2000);
            },
            error : function(err){
              console.log(err);
            }
          })
        }
      })
    })
  </script>


  @endsection
  @section('page-script')
  {{-- Page js files --}}
  {{-- <script src="{{ asset(mix('js/scripts/forms/form-select2.js')) }}"></script> --}}
  {{-- <script src="{{ asset(mix('js/scripts/forms/form-validation.js')) }}"></script> --}}
  <script>
    let token = "{{ csrf_token() }}"
  </script>
  {{-- <script src="{{ asset(mix('js/scripts/apps/user.js')) }}"></script> --}}


@endsection
