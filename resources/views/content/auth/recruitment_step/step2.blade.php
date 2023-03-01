<div id="identification-mark" class="content" role="tabpanel" aria-labelledby="identification-mark-trigger">
    <div class="content-header mb-2">
      <h2 class="fw-bolder mb-75">{{lang('Recruitment identification mark')}}</h2>
      <span>{{lang('Recruitment id information')}}</span>
    </div>
    
      <div class="row">
        <div class="col-md-12 mb-1">
          <div class="row">
            <div class="col-md-6">
              <label class="form-label" for="passport_number">{{lang('Recruitment passport number')}} <span class="text-danger">*</span></label>
              <input type="number" value="{{old("passport_number")}}" name="pasport_number" id="passport_number" class="form-control" placeholder="{{lang('Recruitment passport number')}}" />
            </div>
            <div class="col-md-6">
              <label class="form-label" for="passport_validity">{{lang('Recruitment validity period')}} <span class="text-danger">*</span></label>
              <input type="text" value="{{old("passport_validity")}}" name="passport_validity" id="passport_validity" class="form-control" placeholder="{{lang('Recruitment validity period')}}" />
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-1">
          <div class="row">
            <div class="col-md-4">
              <label class="form-label">{{lang("Recruitment driver's license")}} <span class="text-danger">*</span></label>
              <select class="form-control select2" name="drivers_license">
                <option value="A" {{(old("blood_group") == 'A')? 'selected':''}}>A</option>
                <option value="B" {{(old("blood_group") == 'B')? 'selected':''}}>B</option>
                <option value="C" {{(old("blood_group") == 'C')? 'selected':''}}>C</option>
              </select>
            </div>

            <div class="col-md-4">
              <label class="form-label" for="identity_card_number_sim">{{lang('Recruitment identity card number')}} <span class="text-danger">*</span></label>
              <input type="number" value="{{old("identity_card_number_sim")}}" name="identity_card_number_sim" id="identity_card_number_sim" class="form-control" placeholder="{{lang('Recruitment identity card number')}}" />
            </div>
            <div class="col-md-4">
              <label class="form-label" for="validity_period_sim">{{lang('Recruitment validity period')}} <span class="text-danger">*</span></label>
              <input type="text" value="{{old("validity_period_sim")}}" name="validity_period_sim" id="validity_period_sim" class="form-control" placeholder="{{lang('Recruitment validity period')}}" />
            </div>
          </div>

          <div class="row mb-1">
            <div class="col-md-4">
              <label class="form-label" for="religion">{{lang('Recruitment religion')}} <span class="text-danger">*</span></label>
              <select class="form-control select2" name="religion">
                @foreach ($option as $item)
                    @if ($item->group == 'religion')
                      <option value="{{$item->id}}">{{$item->name}}</option>
                    @endif
                @endforeach
              </select>
              religion
            </div>
            <div class="col-md-4">
              <label class="form-label" for="tribes">{{lang('Recruitment tribes')}} <span class="text-danger">*</span></label>
              <input type="text" value="{{old("tribes")}}" name="tribes" id="tribes" class="form-control" placeholder="{{lang('Recruitment tribes')}}" />
            </div>
            <div class="col-md-4">
              <label class="form-label" for="citizenship">{{lang('Recruitment citizenship')}} <span class="text-danger">*</span></label>
              <select class="form-control select2" name="citizenship">
                <option value="WNI" {{(old("citizenship") == 'WNI')? 'selected':''}}>{{lang('Recruitment WNI')}}</option>
                <option value="Keturunan" {{(old("citizenship") == 'Keturunan')? 'selected':''}}>{{lang('Recruitment Keturunan')}}*</option>
              </select>
            </div>
          </div>

          <div class="row mb-1">
            <div class="col-md-4">
              <label class="form-label">{{lang("Recruitment blood group")}} <span class="text-danger">*</span></label>
              <select class="form-control select2" name="blood_group">
                @foreach ($option as $item)
                    @if ($item->group == 'blood_group')
                      <option value="{{$item->id}}">{{$item->name}}</option>
                    @endif
                @endforeach
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">{{lang("Recruitment height and weight")}} <span class="text-danger">*</span></label>
              
              <div class="input-group">
                <input type="number" name="height" class="form-control" placeholder="height" aria-label="height">
                <span class="input-group-text" style="padding: 0 5px">cm</span>
                <input type="number" name="width" class="form-control" placeholder="width" aria-label="width">
                <span class="input-group-text" style="padding: 0 5px">Kg</span>
              </div>
            </div>

            <div class="col-md-4">
              <label class="form-label">{{lang("Recruitment kacamata")}} <span class="text-danger">*</span></label>
              <select class="form-control select2" name="kacamata">
                <option value="y" {{(old("kacamata") == 'y')? 'selected':''}}>{{lang('Recruitment y')}}</option>
                <option value="n" {{(old("kacamata") == 'n')? 'selected':''}}>{{lang('Recruitment n')}}</option>
              </select>
            </div>  
          </div>

          {{-- <div class="row mb-1">
            <div class="col-md-12 mb-1">
              <label class="form-label">{{lang("Recruitment question 1")}} <span class="text-danger">*</span></label>
              <textarea name="question1" class="form-control" rows="2" placeholder="{{lang("Recruitment question 1")}}"></textarea>
            </div>
            <div class="col-md-12 mb-1">
              <label class="form-label">{{lang("Recruitment question 2")}} <span class="text-danger">*</span></label>
              <textarea name="question2" class="form-control" rows="2" placeholder="{{lang("Recruitment question 2")}}"></textarea>
            </div>
          </div> --}}

        </div>

      </div>
      
    <div class="d-flex justify-content-between mt-2">
      <button type="button" class="btn btn-outline-primary btn-prev">
        <i data-feather="chevron-left" class="align-middle me-sm-25 me-0"></i>
        <span class="align-middle d-sm-inline-block d-none">{{lang('Recruitment previous')}}</span>
      </button>
      <button type="button" class="btn btn-primary btn-validata" target="form_tanda_pengenal" step="2" next="#btn-next2">
        <span class="align-middle d-sm-inline-block d-none">{{lang('Recruitment next')}}</span>
        <i data-feather="chevron-right" class="align-middle ms-sm-25 ms-0"></i>
      </button>
      <button type="button" id="btn-next2" style="display: none" class="btn-next"></button>
    </div>

  </div>