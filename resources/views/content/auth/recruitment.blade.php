@extends('layouts/fullLayoutMaster')

@section('title', lang('Recruitment recruitment_title'))

@section('vendor-style')
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/wizard/bs-stepper.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
@endsection

@section('page-style')
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-wizard.css')) }}">
  {{-- <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}"> --}}
  <link rel="stylesheet" href="{{ asset(mix('css/base/pages/authentication.css')) }}">
  <style>
    #table thead,#table tbody, #table tr td,#table tr th{
      border: none;
    }
    #table tr .table-secondary{
      background-color: #e6e7e8 !important
    }
    #table tr th{
      background: #ffffff;
      /* text-align:center !important; */
    }
  </style>
@endsection

@section('content')

<div class="auth-wrapper auth-cover">
  <div class="auth-inner row m-0">
    <!-- Brand logo-->
    <a class="brand-logo" href="/">
      <svg
        viewBox="0 0 139 95"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        height="28"
      >
        <defs>
          <lineargradient id="linearGradient-1" x1="100%" y1="10.5120544%" x2="50%" y2="89.4879456%">
            <stop stop-color="#000000" offset="0%"></stop>
            <stop stop-color="#FFFFFF" offset="100%"></stop>
          </lineargradient>
          <lineargradient id="linearGradient-2" x1="64.0437835%" y1="46.3276743%" x2="37.373316%" y2="100%">
            <stop stop-color="#EEEEEE" stop-opacity="0" offset="0%"></stop>
            <stop stop-color="#FFFFFF" offset="100%"></stop>
          </lineargradient>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Artboard" transform="translate(-400.000000, -178.000000)">
            <g id="Group" transform="translate(400.000000, 178.000000)">
              <path
                class="text-primary"
                id="Path"
                d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                style="fill: currentColor"
              ></path>
              <path
                id="Path1"
                d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                fill="url(#linearGradient-1)"
                opacity="0.2"
              ></path>
              <polygon
                id="Path-2"
                fill="#000000"
                opacity="0.049999997"
                points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
              ></polygon>
              <polygon
                id="Path-21"
                fill="#000000"
                opacity="0.099999994"
                points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
              ></polygon>
              <polygon
                id="Path-3"
                fill="url(#linearGradient-2)"
                opacity="0.099999994"
                points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
              ></polygon>
            </g>
          </g>
        </g>
      </svg>
      <h2 class="brand-text text-primary ms-1">{{env("APP_NAME")}}</h2>
    </a>
    <!-- /Brand logo-->

    {{-- Select Language --}}
    {{-- <div class="fixed-top text-end mt-2">
      <div class="dropdown">
          <span class="dropdown-toggle" type="button" id="dropdownLanguage" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
              <i class="flag-icon {{App::getLocale() == 'id' ? 'flag-icon-id' : 'flag-icon-us'}}"></i>
              <span class="selected-language">{{App::getLocale() == 'id' ? 'Indonesian' : 'English'}}</span>
          </span>
          <ul class="dropdown-menu" aria-labelledby="dropdownLanguage">
            <li>
              <a class="dropdown-item" href="{{url('lang/en')}}" data-language="en">
                  <i class="flag-icon flag-icon-us"></i> English
                </a>
            </li>
            <li>
              <a class="dropdown-item" href="{{url('lang/id')}}" data-language="en">
                  <i class="flag-icon flag-icon-id"></i> Indonesian
                </a>
            </li>
          </ul>
      </div>
  </div> --}}
  {{-- /Select Language --}}

    <!-- Left Text-->
    <div class="col-lg-3 d-none d-lg-flex align-items-center p-0">
      <div class="w-100 d-lg-flex align-items-center justify-content-center">
        <img
          class="img-fluid w-100"
          src="{{asset('images/illustration/create-account.svg')}}"
          alt="multi-steps"
        />
      </div>
    </div>
    <!-- /Left Text-->

    <!-- Register-->
    <div class="col-lg-9 d-flex align-items-center auth-bg px-2 px-sm-3 px-lg-5 pt-3">
      <div class=" mx-auto">
        <div class="bs-stepper register-multi-steps-wizard shadow-none">
          @include('content.auth.recruitment_step.steper')
          <div class="bs-stepper-content px-0 mt-4">
            <form id="form_personal_data" method="POST" enctype="multipart/form-data">



            {{-- Account Step --}}
            @include('content.auth.recruitment_step.step1')
            {{-- /Account Step --}}

            {{-- identification-mark Step --}}
            @include('content.auth.recruitment_step.step2')
            {{-- /identification-mark Step --}}

            {{-- identification-mark Step --}}
            @include('content.auth.recruitment_step.step3')
            {{-- /identification-mark Step --}}

            {{-- educational-background Step --}}
            @include('content.auth.recruitment_step.step4')
            {{-- /educational-background Step --}}

            {{-- educational-background Step --}}
            @include('content.auth.recruitment_step.step5')
            {{-- /educational-background Step --}}

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection

@section('vendor-script')
<script src="{{asset(mix('vendors/js/forms/wizard/bs-stepper.min.js'))}}"></script>
<script src="{{asset(mix('vendors/js/forms/select/select2.full.min.js'))}}"></script>
{{-- <script src="{{asset(mix('vendors/js/forms/validation/jquery.validate.min.js'))}}"></script> --}}
<script src="{{asset(mix('vendors/js/forms/cleave/cleave.min.js'))}}"></script>
<script src="{{asset(mix('vendors/js/forms/cleave/addons/cleave-phone.us.js'))}}"></script>
<script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
@endsection

@section('page-script')
<script>
  $(document).ready(function(){


    $('.add-photo').click(function(){
      var template = [
        '<div class="col-md-6 mb-1">',
          '<label class="form-label"> Photo 3 x 4 </label>',
          '<div class="input-group">',
            '<input class="form-control" name="photo[]" type="file">',
            '<span class="input-group-text" onclick="$(this).parent().parent().remove()" style="cursor: pointer" id="basic-addon2">',
              'X',
            '</span>',
          '</div>',
          '<div class="err err-photo text-danger"></div>',
        '</div>'
      ].join('\n')

      $('.photo').append(template);
    })

    $('.btn-add-rows').click(function(){
      var target = $(this).attr('target');
      var prefix = $(this).attr('prefix');
      var template = [
        '<tr>',
          '<td> <button onclick="$(this).parent().parent().remove()" type="button" class="btn btn-sm btn-danger"> - </button></td>',
          '<td><input type="text" name="'+prefix+'_name[]" class="form-control"><div class="text-danger err-'+prefix+'_name"></div></td>',
          '<td><select name="'+prefix+'_gender[]" class="form-control select2">',
            @foreach ($option as $item)
              @if ($item->group == 'gender')
                '<option value="{{$item->id}}">{{$item->name}}</option>',
              @endif
            @endforeach
            '</select><div class="text-danger err-'+prefix+'_gender"></div></td>',
          '<td><input type="number" name="'+prefix+'_age[]" class="form-control"><div class="text-danger err-'+prefix+'_age"></div></td>',
          '<td>',
            '<select name="'+prefix+'_education[]" class="form-control select2">',
              @foreach ($option as $item)
                @if ($item->group == 'school_level')
                  '<option value="{{$item->id}}">{{$item->name}}</option>',
                @endif
              @endforeach
            '</select> <div class="text-danger err-'+prefix+'_education"></div>',
          '</td>',
          '<td><input type="text" name="'+prefix+'_position[]" class="form-control"><div class="text-danger err-'+prefix+'_position"></div></td>',
          '<td><input type="text" name="'+prefix+'_company[]" class="form-control"><div class="text-danger err-'+prefix+'_company"></div></td>',
        '</tr>',
      ].join('\n');
      $(target).append(template);
    })

    $('.btn-add-rows-formal-education').click(function(){
      var target = $(this).attr('target');
      var prefix = $(this).attr('prefix');
      var template = [
        '<tr>',
          '<td> <button onclick="$(this).parent().parent().remove()" type="button" class="btn btn-sm btn-danger"> - </button></td>',
          '<td><select name="'+prefix+'_school_level[]" class="form-control select2">',
            @foreach ($option as $item)
              @if ($item->group == 'school_level')
                '<option value="{{$item->id}}">{{$item->name}}</option>',
              @endif
            @endforeach
          '</select><div class="text-danger err-'+prefix+'_school_level"></div></td>',
          '<td><input type="text" name="'+prefix+'_nama_sekolah[]" class="form-control"><div class="text-danger err-'+prefix+'_nama_sekolah"></div></td>',
          '<td><input type="text" name="'+prefix+'_tempat_kota[]" class="form-control"><div class="text-danger err-'+prefix+'_tempat_kota"></div></td>',
          '<td><input type="number" name="'+prefix+'_mulai[]" class="form-control"><div class="text-danger err-'+prefix+'_mulai"></div></td>',
          '<td><input type="number" name="'+prefix+'_selesai[]" class="form-control"><div class="text-danger err-'+prefix+'_selesai"></div></td>',
          '<td><select name="'+prefix+'_lulus[]" class="form-control select2"><option value="y">{{lang('Recruitment y')}}</option><option value="n">{{lang('Recruitment n')}}</option></select><div class="text-danger err-'+prefix+'_lulus"></div></td>',
        '</tr>',
      ].join('\n');
      $(target).append(template);
    })

    $('.btn-add-rows-course-training').click(function(){
      var target = $(this).attr('target');
      var prefix = $(this).attr('prefix');

      var template = [
        '<tr>',
          '<td><input type="text" name="'+prefix+'_jenis[]" class="form-control"><div class="text-danger err-'+prefix+'_jenis"></div></td>',
          '<td><input type="text" name="'+prefix+'_penyelenggara[]" class="form-control"><div class="text-danger err-'+prefix+'_penyelenggara"></div></td>',
          '<td><input type="text" name="'+prefix+'_tempat[]" class="form-control"><div class="text-danger err-'+prefix+'_tempat"></div></td>',
          '<td><input type="text" name="'+prefix+'_waktu[]" class="form-control"><div class="text-danger err-'+prefix+'_waktu"></div></td>',
          '<td><input type="text" name="'+prefix+'_dibiayai[]" class="form-control"><div class="text-danger err-'+prefix+'_dibiayai"></div></td>',
          '<td> <button onclick="$(this).parent().parent().remove()" type="button" class="btn btn-sm btn-danger"> - </button></td>',
        '</tr>',
      ].join('\n');
      $(target).append(template);
    })

    

    $('.btn-add-rows-certificate').click(function(){
      var target = $(this).attr('target');
      var prefix = $(this).attr('prefix');

      var template = [
        '<tr>',
          '<td><input type="text" name="'+prefix+'_jenis[]" class="form-control"><div class="text-danger err-'+prefix+'_jenis"></div></td>',
          '<td><input type="text" name="'+prefix+'_penyelenggara[]" class="form-control"><div class="text-danger err-'+prefix+'_penyelenggara"></div></td>',
          '<td><input type="text" name="'+prefix+'_tempat[]" class="form-control"><div class="text-danger err-'+prefix+'_tempat"></div></td>',
          '<td><input type="text" name="'+prefix+'_start[]" class="form-control"><div class="text-danger err-'+prefix+'_start"></div></td>',
          '<td><input type="text" name="'+prefix+'_end[]" class="form-control"><div class="text-danger err-'+prefix+'_end"></div></td>',
          '<td><input type="text" name="'+prefix+'_dibiayai[]" class="form-control"><div class="text-danger err-'+prefix+'_dibiayai"></div></td>',
          '<td> <button onclick="$(this).parent().parent().remove()" type="button" class="btn btn-sm btn-danger"> - </button></td>',
        '</tr>',
      ].join('\n');
      $(target).append(template);
    })


    $('.btn-add-rows-language_ability').click(function(){
      var target = $(this).attr('target');
      var prefix = $(this).attr('prefix');

      var template = [
        '<tr>',
          '<td><input type="text" name="'+prefix+'_bahasa[]" class="form-control"><div class="text-danger err-'+prefix+'_bahasa"></div></td>',
          '<td><select name="'+prefix+'_hear[]" class="form-control select2"><option value="baik sekali">{{lang('Recruitment baik sekali')}}</option><option value="baik">{{lang('Recruitment baik')}}</option><option value="cukup">{{lang('Recruitment cukup')}}</option></select></td>',
          '<td><select name="'+prefix+'_read[]" class="form-control select2"><option value="baik sekali">{{lang('Recruitment baik sekali')}}</option><option value="baik">{{lang('Recruitment baik')}}</option><option value="cukup">{{lang('Recruitment cukup')}}</option></select></td>',
          '<td><select name="'+prefix+'_write[]" class="form-control select2"><option value="baik sekali">{{lang('Recruitment baik sekali')}}</option><option value="baik">{{lang('Recruitment baik')}}</option><option value="cukup">{{lang('Recruitment cukup')}}</option></select></td>',
          '<td><select name="'+prefix+'_speak[]" class="form-control select2"><option value="baik sekali">{{lang('Recruitment baik sekali')}}</option><option value="baik">{{lang('Recruitment baik')}}</option><option value="cukup">{{lang('Recruitment cukup')}}</option></select></td>',
          '<td> <button onclick="$(this).parent().parent().remove()" type="button" class="btn btn-sm btn-danger"> - </button></td>',
        '</tr>',
      ].join('\n');
      $(target).append(template);
    })

    $('.btn-add-rows-Social_Activities').click(function(){
      var target = $(this).attr('target');
      var prefix = $(this).attr('prefix');

      var template = [
        '<tr>',
          '<td><input type="text" name="'+prefix+'_social_activities[]" class="form-control"><div class="text-danger err-'+prefix+'_social_activities"></div></td>',
          '<td><input type="text" name="'+prefix+'_position[]" class="form-control"><div class="text-danger err-'+prefix+'_position"></div></td>',
          '<td><input type="text" name="'+prefix+'_city[]" class="form-control"><div class="text-danger err-'+prefix+'_city"></div></td>',
          '<td><input type="text" name="'+prefix+'_start[]" class="form-control"><div class="text-danger err-'+prefix+'_start"></div></td>',
          '<td><input type="text" name="'+prefix+'_end[]" class="form-control"><div class="text-danger err-'+prefix+'_end"></div></td>',
          '<td> <button onclick="$(this).parent().parent().remove()" type="button" class="btn btn-sm btn-danger"> - </button></td>',
        '</tr>',
      ].join('\n');
      $(target).append(template);
    })

    $('.btn-add-rows-Leisure_Activities').click(function(){
      var target = $(this).attr('target');
      var prefix = $(this).attr('prefix');

      var template = [
        '<tr>',
          '<td><input type="text" name="'+prefix+'_Leisure_Activities[]" class="form-control"><div class="text-danger err-'+prefix+'_Leisure_Activities"></div></td>',
          '<td><input type="text" name="'+prefix+'_active[]" class="form-control"><div class="text-danger err-'+prefix+'_active"></div></td>',
          '<td><input type="text" name="'+prefix+'_passive[]" class="form-control"><div class="text-danger err-'+prefix+'_passive"></div></td>',
          '<td> <button onclick="$(this).parent().parent().remove()" type="button" class="btn btn-sm btn-danger"> - </button></td>',
        '</tr>',
      ].join('\n');
      $(target).append(template);
    })


    $('.btn-add-rows-Employment_history').click(function(){
      var inc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      var counts = parseInt($(this).attr('count')) + 1;
      var target = $(this).attr('target');
      var prefix = $(this).attr('prefix');
      $(this).attr('count', counts);
      var template = [
        '<table class="table table-sm">',
          '<thead>',
            '<tr>',
              '<th colspan="5" class="table-secondary py-1">{{lang('Recruitment Employment History: (Write starting from current/last job)')}} <span class="text-danger">*</span></th>',
              '<th class="text-end table-secondary">',
                '<button type="button" onclick="$(this).parent().parent().parent().parent().remove()" style="margin-top:5px" class="btn btn-sm btn-danger">-</button>',
              '</th>',
            '</tr>',
            '<tr>',
              '<th rowspan="2" class="text-center align-middle"><span>'+inc[counts]+'</span></th>',
              '<th colspan="2" class="text-center align-middle">{{lang('Recruitment Years of service')}}</th>',
              '<th rowspan="2" class="text-center align-middle">{{lang('Recruitment salary')}}</th>',
              '<th rowspan="2" class="text-center align-middle">{{lang('Recruitment subsidy')}}</th>',
              '<th rowspan="2" class="text-center align-middle">{{lang('Recruitment Position/position')}}</th>',
            '</tr>',
            '<tr>',
              '<th>{{lang('Recruitment Years of service month')}}</th>',
              '<th>{{lang('Recruitment Years of service year')}}</th>',
            '</tr>',
          '</thead>',
          '<tbody>',
            '<tr>',
              '<td><b>{{lang('Recruitment start')}}</b></td>',
              '<td>',
                '<select name="employee_history_start_bln[]" class="form-control">',
                      @foreach ($option as $item)
                        @if ($item->group == 'month')
                          '<option value="{{$item->id}}">{{$item->name}}</option>',
                        @endif
                      @endforeach
                '</select><div class="text-danger err-employee_history_start_bln"></div>',
              '</td>',
              '<td><input type="text" name="employee_history_start_thn[]" class="form-control"><div class="text-danger err-employee_history_start_thn"></div></td>',
              '<td><input type="text" name="employee_history_start_gaji[]" class="form-control"><div class="text-danger err-employee_history_start_gaji"></div></td>',
              '<td><input type="text" name="employee_history_start_tunjangan[]" class="form-control"><div class="text-danger err-employee_history_start_tunjangan"></div></td>',
              '<td><input type="text" name="employee_history_start_posisi_jabatan[]" class="form-control"><div class="text-danger err-employee_history_start_posisi_jabatan"></div></td>',
            '</tr>',
            '<tr>',
              '<td><b>{{lang('Recruitment finish')}}</b></td>',
              '<td>',
                '<select name="employee_history_finish_bln[]" class="form-control">',
                      @foreach ($option as $item)
                        @if ($item->group == 'month')
                          '<option value="{{$item->id}}">{{$item->name}}</option>',
                        @endif
                      @endforeach
                '</select> <div class="text-danger err-employee_history_finish_bln"></div>', 
              '</td>',
              '<td><input type="text" name="employee_history_finish_thn[]" class="form-control"><div class="text-danger err-employee_history_finish_thn"></div></td>',
              '<td><input type="text" name="employee_history_finish_gaji[]" class="form-control"><div class="text-danger err-employee_history_finish_gaji"></div></td>',
              '<td><input type="text" name="employee_history_finish_tunjangan[]" class="form-control"><div class="text-danger err-employee_history_finish_tunjangan"></div></td>',
              '<td><input type="text" name="employee_history_finish_posisi_jabatan[]" class="form-control"><div class="text-danger err-employee_history_finish_posisi_jabatan"></div></td>',
            '</tr>',
            '<tr>',
              '<td colspan="6">{{lang('Recruitment Company Name, Address & Telephone')}}</td>',
            '</tr>',
            '<tr>',
              '<td colspan="6"><textarea name="employee_history_company_name_and_address[]" class="form-control" rows="2"></textarea> <div class="text-danger err-employee_history_company_name_and_address"></div></td>',
            '</tr>',
            '<tr>',
              '<td colspan="2">{{lang('Recruitment Type of business')}}</td>',
              '<td colspan="4"><input type="text" name="employee_history_jenis_usaha[]" class="form-control"> <div class="text-danger err-employee_history_jenis_usaha"></div></td>',
            '</tr>',
            '<tr>',
              '<td colspan="2">{{lang('Recruitment Reason to stop')}}</td>',
              '<td colspan="4"><input type="text" name="employee_history_alasan_berhenti[]" class="form-control"> <div class="text-danger err-employee_history_alasan_berhenti"></div></td>',
            '</tr>',
            '<tr>',
              '<td colspan="6">{{lang('Recruitment Brief Overview of Duties, Responsibilities & Authorities in Last Position')}}</td>',
            '</tr>',
            '<tr>',
              '<td colspan="4">',
                '<textarea name="employee_history_gambaran_singkat[]" class="form-control" rows="2"></textarea> <div class="text-danger err-employee_history_gambaran_singkat"></div>',
              '</td>',
              '<td colspan="2">',
                '<textarea name="employee_history_gambaran_struktur_organisasi[]" placeholder="{{lang('Recruitment Position in the Organizational Structure')}}" class="form-control" rows="2"></textarea> <div class="text-danger err-employee_history_gambaran_struktur_organisasi"></div>',
              '</td>',
            '</tr>',
          '</tbody>',
        '</table>',
      ].join('\n');

      $(target).append(template);
    })
    

    $('.btn-validata').click(function(){
      var target = $(this).attr('target');
      var next = $(this).attr('next');
      var step = $(this).attr('step');
      $('[name=step]').val(step);


      $('.errs').remove();
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
        }
      });
      var formData = new FormData(document.getElementById('form_personal_data'));
      $.ajax({
        url   : '/recruitment',
        type  : 'POST',
        data  : formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        enctype: 'multipart/form-data',
        success : function(data){
          console.log(data);
          if (step == 5) {
            if (data.status == true) {
              Swal.fire({
                icon: 'success',
                title: '{{lang("Recruitment Success")}}',
                text: '{{lang("Recruitment response message")}}',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              }).then(function(){
                window.location = '/recruitment';
              });
            }
          } else {
            $(next).click();
          }
        },
        error : function(err){
          var errs = err.responseJSON.errors
          Object.keys(errs).forEach(key => {
            

            var result = key.split('.');
            console.log(result);
            if(1 in result){

              var errclass = document.getElementsByClassName('err-'+result[0])[result[1]];
              $(errclass).html('<small>'+errs[result[0]+'.'+result[1]][0].replace(key, 'Field')+'</small>')
            }else{
              $('[name='+key+']').addClass('is-invalid')
              $('[name='+key+']').parent().append('<div class="text-danger errs err-'+key+'"> <small> '+errs[key][0]+' </small> </div>');
            }

          });
        }
      });
    })

    $('.form-control').keyup(function(){
      $(this).removeClass('is-invalid');
      $('.err-'+$(this).attr('name')).remove();
    })

    
  })
</script>
<script src="{{asset(mix('js/scripts/pages/recruitment.js'))}}"></script>
@endsection
