<div id="Family-Structure" class="content" role="tabpanel" aria-labelledby="Family-Structure-trigger">
    <div class="content-header mb-2">
      <h2 class="fw-bolder mb-75">{{lang('Recruitment family structure')}}</h2>
      <span>{{lang('Recruitment family structure details')}}</span>
    </div>
    
      <div class="row">
        <div class="col-md-12 mb-1">
          <label class="form-label" for="identity_card">{{lang('Recruitment family structure')}} ({{lang('Recruitment including yourself')}}) <span class="text-danger">*</span></label>
          <div style="" class="card-datatable table-responsive pt-0">
            <table id="table" class="table table-sm">
              <thead>
                <tr>
                  <th rowspan="2">{{lang('Recruitment connection family')}}</th>
                  <th rowspan="2">{{lang('Recruitment full name')}}</th>
                  <th rowspan="2">{{lang('Recruitment gander lp')}}</th>
                  <th rowspan="2">{{lang('Recruitment age in this year')}}</th>
                  <th rowspan="2">{{lang('Recruitment education')}}</th>
                  <th colspan="2" class="text-center">{{lang('Recruitment last job')}}</th>
                </tr>
                <tr>
                  <th>{{lang('Recruitment position')}}</th>
                  <th>{{lang('Recruitment company')}}</th>
                </tr>
              </thead>
              <tbody id="class-sibling">
                <tr>
                  <td>{{lang('Recruitment father')}}</td>
                  <td><input type="text" name="father" class="form-control"></td>
                  <td>
                    <select name="father_gender" class="form-control select2">
                      @foreach ($option as $item)
                        @if ($item->group == 'gender')
                          <option value="{{$item->id}}">{{$item->name}}</option>
                        @endif
                      @endforeach
                    </select>
                  </td>
                  <td><input type="number" name="father_age" class="form-control"></td>
                  <td>
                    <select name="father_education" class="form-control select2">
                      @foreach ($option as $item)
                        @if ($item->group == 'school_level')
                          <option value="{{$item->id}}">{{$item->name}}</option>
                        @endif
                      @endforeach
                    </select>
                  </td>
                  <td><input type="text" name="father_position" class="form-control"></td>
                  <td><input type="text" name="father_company" class="form-control"></td>
                </tr>
                <tr>
                  <td>{{lang('Recruitment mother')}}</td>
                  <td><input type="text" name="mother" class="form-control"></td>
                  <td>
                    <select name="mother_gender" class="form-control select2">
                      @foreach ($option as $item)
                        @if ($item->group == 'gender')
                          <option value="{{$item->id}}">{{$item->name}}</option>
                        @endif
                      @endforeach
                    </select>
                  </td>
                  <td><input type="number" name="mother_age" class="form-control"></td>
                  <td>
                    <select name="mother_education" class="form-control select2">
                      @foreach ($option as $item)
                        @if ($item->group == 'school_level')
                          <option value="{{$item->id}}">{{$item->name}}</option>
                        @endif
                      @endforeach
                    </select>
                  </td>
                  <td><input type="text" name="mother_position" class="form-control"></td>
                  <td><input type="text" name="mother_company" class="form-control"></td>
                </tr>
                <tr>
                  <td colspan="6"> {{lang('Recruitment sibling')}} </td>
                  <td class="text-end">
                    <a href="#" target="#class-sibling" prefix="sibling" class="btn btn-add-rows btn-sm btn-success"><i data-feather="plus"></i></a>
                  </td>
                </tr>
              </tbody>
              <tbody id="marital-status">
                <tr>
                  <td colspan=3"> {{lang('Recruitment marital status')}} </td>
                  <td colspan="4">
                    <select name="marital_status" class="form-control">
                      @foreach ($option as $item)
                        @if ($item->group == 'maratial_status')
                          <option value="{{$item->id}}">{{$item->name}}</option>
                        @endif
                      @endforeach
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colspan=6"> {{lang('Recruitment child')}} </td>
                  <td class="text-end">
                    <a href="#" target="#marital-status" prefix="child" class="btn btn-add-rows btn-sm btn-success"><i data-feather="plus"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


        </div>
        
      </div>
      

    <div class="d-flex justify-content-between mt-2">
      <button type="button" class="btn btn-outline-primary btn-prev">
        <i data-feather="chevron-left" class="align-middle me-sm-25 me-0"></i>
        <span class="align-middle d-sm-inline-block d-none">{{lang('Recruitment previous')}}</span>
      </button>
      <button type="button" class="btn btn-primary btn-validata" target="from_susunan_keluarga" step="3" next="#btn-next3">
        <span class="align-middle d-sm-inline-block d-none">{{lang('Recruitment next')}}</span>
        <i data-feather="chevron-right" class="align-middle ms-sm-25 ms-0"></i>
      </button>
      <button type="button" id="btn-next3" style="display: none" class="btn-next"></button>
    </div>

  </div>