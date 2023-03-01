<div id="Employment-history" class="content" role="tabpanel" aria-labelledby="educational-background-trigger">
    <div class="content-header mb-2">
      <h2 class="fw-bolder mb-75">{{lang('Recruitment Employment history')}}</h2>
      <span>{{lang('Recruitment Employment history details')}}</span>
    </div>
    
      <div class="row">
        <div class="col-md-12 mb-1">

          
          <div style="overflow-x:unset" id="Employment_history" class="card-datatable table-responsive pt-0">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th colspan="5" class="table-secondary py-1">{{lang('Recruitment Employment History: (Write starting from current/last job)')}} <span class="text-danger">*</span></th>
                  <th class="text-end table-secondary">
                    <button type="button" count="0" style="margin-top:5px" target="#Employment_history" prefix="Employment_history" class="btn btn-add-rows-Employment_history btn-sm btn-success">+</button>
                  </th>
                </tr>
                <tr>
                  <th rowspan="2" class="text-center align-middle"><span>A</span></th>
                  <th colspan="2" class="text-center align-middle">{{lang('Recruitment Years of service')}}</th>
                  <th rowspan="2" class="text-center align-middle">{{lang('Recruitment salary')}}</th>
                  <th rowspan="2" class="text-center align-middle">{{lang('Recruitment subsidy')}}</th>
                  <th rowspan="2" class="text-center align-middle">{{lang('Recruitment Position/position')}}</th>
                </tr>
                <tr>
                  <th>{{lang('Recruitment Years of service month')}}</th>
                  <th>{{lang('Recruitment Years of service year')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>{{lang('Recruitment start')}}</b></td>
                  <td>
                    <select name="employee_history_start_bln[]" class="form-control">
                      @foreach ($option as $item)
                        @if ($item->group == 'month')
                          <option value="{{$item->id}}">{{$item->name}}</option>
                        @endif
                      @endforeach
                    </select>
                  </td>
                  <td><input type="text" name="employee_history_start_thn[]" class="form-control"></td>
                  <td><input type="text" name="employee_history_start_gaji[]" class="form-control"></td>
                  <td><input type="text" name="employee_history_start_tunjangan[]" class="form-control"></td>
                  <td><input type="text" name="employee_history_start_posisi_jabatan[]" class="form-control"></td>
                </tr>
                <tr>
                  <td><b>{{lang('Recruitment finish')}}</b></td>
                  <td>
                    <select name="employee_history_finish_bln[]" class="form-control">
                      @foreach ($option as $item)
                        @if ($item->group == 'month')
                          <option value="{{$item->id}}">{{$item->name}}</option>
                        @endif
                      @endforeach
                    </select>
                  </td>
                  <td><input type="text" name="employee_history_finish_thn[]" class="form-control"></td>
                  <td><input type="text" name="employee_history_finish_gaji[]" class="form-control"></td>
                  <td><input type="text" name="employee_history_finish_tunjangan[]" class="form-control"></td>
                  <td><input type="text" name="employee_history_finish_posisi_jabatan[]" class="form-control"></td>
                </tr>
                <tr>
                  <td colspan="6">{{lang('Recruitment Company Name, Address & Telephone')}}</td>
                </tr>
                <tr>
                  <td colspan="6"><textarea name="employee_history_company_name_and_address[]" class="form-control" rows="2"></textarea></td>
                </tr>
                <tr>
                  <td colspan="2">{{lang('Recruitment Type of business')}}</td>
                  <td colspan="4"><input type="text" name="employee_history_jenis_usaha[]" class="form-control"></td>
                </tr>
                <tr>
                  <td colspan="2">{{lang('Recruitment Reason to stop')}}</td>
                  <td colspan="4"><input type="text" name="employee_history_alasan_berhenti[]" class="form-control"></td>
                </tr>
                <tr>
                  <td colspan="6">{{lang('Recruitment Brief Overview of Duties, Responsibilities & Authorities in Last Position')}}</td>
                </tr>
                <tr>
                  <td colspan="4">
                    <textarea name="employee_history_gambaran_singkat[]" class="form-control" rows="2"></textarea>
                  </td>
                  <td colspan="2">
                    <textarea name="employee_history_gambaran_struktur_organisasi[]" placeholder="{{lang('Recruitment Position in the Organizational Structure')}}" class="form-control" rows="2"></textarea>
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
      <button type="button" class="btn btn-success btn-validata" target="form_Employment_history" step="5" next="#btn-next5">
        <i data-feather="check" class="align-middle me-sm-25 me-0"></i>
        <span class="align-middle d-sm-inline-block d-none">{{lang('Recruitment register')}}</span>
      </button>
      <button type="button" id="btn-next5" style="display: none" class="btn-next"></button>
    </div>
</div>