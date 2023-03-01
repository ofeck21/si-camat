<div id="account-details" class="content" role="tabpanel" aria-labelledby="account-details-trigger">
    <div class="content-header mb-2">
      <h2 class="fw-bolder mb-75">{{lang('Recruitment personal_data')}}</h2>
      <span>{{lang('Recruitment personal_information')}}</span>
    </div>
      <input type="hidden" name="step" value="1">

      <div class="row photo">
        <div class="col-md-6 mb-1">
          <label class="form-label"> <span style="cursor: pointer" class="add-photo text-info"> + Photo 3 x 4 </span> </label>
          <div class="input-group">
            <input class="form-control" type="file" name="photo[]">
          </div>
          <div class="err err-photo text-danger"></div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">

          <div class="mb-1">
            <div class="row">
              <div class="col-md-6">
                <label class="form-label" for="first_name">{{lang('Recruitment first name')}} <span class="text-danger">*</span></label>
                <input type="text" value="{{old("first_name")}}" name="first_name" id="first_name" class="form-control" placeholder="{{lang('Recruitment first name')}}" />
              </div>
              <div class="col-md-6">
                <label class="form-label" for="last_name">{{lang('Recruitment last name')}} <span class="text-danger">*</span></label>
                <input type="text" value="{{old("last_name")}}" name="last_name" id="last_name" class="form-control" placeholder="{{lang('Recruitment last name')}}" />
              </div>
            </div>
          </div>
          
          <div class="row mb-1">
            <div class="col-md-4">
              <label class="form-label" for="place_of_birth">{{lang('Recruitment place of birth')}} <span class="text-danger">*</span></label>
              <input type="text" value="{{old("place_of_birth")}}" name="place_of_birth" id="place_of_birth" class="form-control" placeholder="{{lang('Recruitment place of birth')}}" />
            </div>
            <div class="col-md-4">
              <label class="form-label" for="date_of_birth">{{lang('Recruitment date of birth')}} <span class="text-danger">*</span></label>
              <input type="date" value="{{old("date_of_birth")}}" name="date_of_birth" id="date_of_birth" class="form-control" placeholder="{{lang('Recruitment date of birth')}}" />
            </div>
            <div class="col-md-4">
              <label class="form-label" for="gender">{{lang('Recruitment gender')}} <span class="text-danger">*</span></label>
              <select class="form-control select2" name="gender">
                @foreach ($option as $item)
                    @if ($item->group == 'gender')
                      <option value="{{$item->id}}">{{$item->name}}</option>
                    @endif
                @endforeach
              </select>
            </div>
          </div>

          <div class="row mb-1">
            <div class="col-md-6">
              <label class="form-label" for="mobile_phone_number">{{lang('Recruitment mobile phone number')}} <span class="text-danger">*</span></label>
              <input type="number" value="{{old("mobile_phone_number")}}" name="mobile_phone_number" id="mobile_phone_number" class="form-control" placeholder="{{lang('Recruitment mobile phone number')}}" />
            </div>
            <div class="col-md-6">
              <label class="form-label" for="phone_number">{{lang('Recruitment phone number')}} <span class="text-danger">*</span></label>
              <input type="number" value="{{old("phone_number")}}" name="phone_number" id="phone_number" class="form-control" placeholder="{{lang('Recruitment phone number')}}" />
            </div>
            
          </div>

          
          
          
        </div>
        {{-- <div class="col-md-3 mb-1">
          <div class="mb-1 text-center">
            <label class="form-label">{{lang('Recruitment foto')}} <span class="text-danger">*</span></label>
            <div>
              <img src="{{asset('images/pages/3x4.jpeg')}}" onclick="$('#foto3x4').click()" id="view-img-3x4" style="width: 3cm;cursor: pointer" alt="photo 3 x 4" srcset="">
              <input type="file" id="foto3x4" onchange="document.getElementById('view-img-3x4').src = window.URL.createObjectURL(this.files[0])" name="photo" accept="image/png, image/gif, image/jpeg" style="display: none">
            </div>
          </div>
        </div> --}}
      </div>


      <div class="row mb-1">
        <div class="col-md-4">
          <div class="mb-1">
            <label class="form-label" for="nik">{{lang('Recruitment Nik')}} <span class="text-danger">*</span></label>
            <input type="text" value="{{old("nik")}}" name="nik" id="nik" class="form-control" placeholder="{{lang('Recruitment Nik')}}" />
          </div>
          <div class="mb-1">
            <label for="file_nik" class="form-label">{{lang('Recruitment Upload Nik')}} <span class="text-danger">*</span> </label>
            <input class="form-control" type="file" id="file_nik" name="file_nik" aria-invalid="false">
          </div>
        </div>

        <div class="col-md-4">
          <div class="mb-1">
            <label class="form-label" for="no_kk">{{lang('Recruitment No KK')}} <span class="text-danger">*</span></label>
            <input type="text" value="{{old("no_kk")}}" name="no_kk" id="no_kk" class="form-control" placeholder="{{lang('Recruitment No KK')}}" />
          </div>
          <div class="mb-1">
            <label for="file_no_kk" class="form-label">{{lang('Recruitment Upload No KK')}} <span class="text-danger">*</span> </label>
            <input class="form-control" type="file" id="file_no_kk" name="file_no_kk" aria-invalid="false">
          </div>
        </div>

        <div class="col-md-4">
          <div class="mb-1">
            <label class="form-label" for="no_skck">{{lang('Recruitment SKCK')}} <span class="text-danger">*</span></label>
            <input type="text" value="{{old("no_skck")}}" name="no_skck" id="no_skck" class="form-control" placeholder="{{lang('Recruitment SKCK')}}" />
          </div>
          <div class="mb-1">
            <label for="file_no_skck" class="form-label">{{lang('Recruitment Upload No SKCK')}} <span class="text-danger">*</span> </label>
            <input class="form-control" type="file" id="file_no_skck" name="file_no_skck" aria-invalid="false">
          </div>
        </div>
        
      </div>

      <div class="row">
        <div class="col-md-12 mb-1">
          <label class="form-label" for="email">{{lang('Recruitment email')}} <span class="text-danger">*</span></label>
          <input type="email" value="{{old("email")}}" name="email" id="email" class="form-control" placeholder="{{lang('Recruitment email')}}" />
        </div>

        <div class="col-md-6 mb-1">
          <label class="form-label" for="id_card_address">{{lang('Recruitment ID card address')}} <span class="text-danger">*</span></label>
          <textarea value="{{old("id_card_address")}}" name="id_card_address" id="id_card_address" class="form-control" rows="2" placeholder="{{lang('Recruitment ID card address')}}"></textarea>
        </div>

        <div class="col-md-6 mb-1">
          <label class="form-label" for="residence_address">{{lang('Recruitment residence address')}} <span class="text-danger">*</span></label>
          <textarea value="{{old("residence_address")}}" name="residence_address" id="residence_address" class="form-control" rows="2" placeholder="{{lang('Recruitment residence address')}}"></textarea>
        </div>
      </div>

    {{-- </form> --}}

    <div class="d-flex justify-content-between mt-2">
      <div></div>
      {{-- <button type="button" class="btn btn-outline-secondary btn-prev" disabled>
        <i data-feather="chevron-left" class="align-middle me-sm-25 me-0"></i>
        <span class="align-middle d-sm-inline-block d-none">{{lang('Recruitment previous')}}</span>
      </button> --}}
      <button type="button" class="btn btn-primary btn-validata" target="form_personal_data" step="1" next="#btn-next1">
        <span class="align-middle d-sm-inline-block d-none">{{lang('Recruitment next')}}</span>
        <i data-feather="chevron-right" class="align-middle ms-sm-25 ms-0"></i>
      </button>
      <button type="button" id="btn-next1" style="display: none" class="btn-next"></button>
    </div>
</div>