<div id="educational-background" class="content" role="tabpanel" aria-labelledby="educational-background-trigger">
    <div class="content-header mb-2">
      <h2 class="fw-bolder mb-75">{{lang('Recruitment formal education')}}</h2>
      <span>{{lang('Recruitment formal education details')}}</span>
    </div>
    
      <div class="row">
        <div class="col-md-12 mb-1">

          
          <div style="overflow-x:unset" class="card-datatable table-responsive pt-0">
            <table id="table" class="table table-sm">
              <thead>
                <tr class="table-">
                  <th colspan="6" class="table-secondary align-bottom py-1">{{lang('Recruitment formal education')}} <span class="text-danger">*</span></th>
                  <th class="text-end align-bottom table-secondary">
                    <button type="button" style="margin-top:5px" target="#formal_education" prefix="formal_education" class="btn btn-add-rows-formal-education btn-sm btn-success">+</button>
                  </th>
                </tr>
                <tr class="table-bordered">
                  <th rowspan="2"></th>
                  <th class="align-bottom" rowspan="2">{{lang('Recruitment school level')}}</th>
                  <th class="align-bottom" rowspan="2">{{lang('Recruitment school name (faculty/department)')}}</th>
                  <th class="align-bottom" rowspan="2">{{lang('Recruitment Place / City')}}</th>
                  <th class="align-bottom text-center" colspan="2">{{lang('Recruitment year')}}</th>
                  <th class="align-bottom" rowspan="2">{{lang('Recruitment Graduated/Not')}}</th>
                </tr>
                <tr>
                  <th class="align-bottom">{{lang('Recruitment start')}}</th>
                  <th class="align-bottom">{{lang('Recruitment finish')}}</th>
                </tr>
              </thead>
              <tbody id="formal_education">
              </tbody>
            </table>
          </div>

          <div style="overflow-x:unset" class="card-datatable table-responsive pt-0">
            <table id="table" class="table table-sm">
              <thead>
                <tr>
                  <th colspan="5" class="table-secondary py-1">{{lang('Recruitment course / training')}} <span class="text-danger">*</span></th>
                  <th class="text-end table-secondary">
                    <button type="button" style="margin-top:5px" target="#course_training" prefix="course_training" class="btn btn-add-rows-course-training btn-sm btn-success">+</button>
                  </th>
                </tr>
                <tr>
                  <th>{{lang('Recruitment Field / Type')}}</th>
                  <th>{{lang('Recruitment Organizer')}}</th>
                  <th>{{lang('Recruitment Place / City')}}</th>
                  <th>{{lang('Recruitment time')}}</th>
                  <th>{{lang('Recruitment Funded By (Certificate/Not)')}}</th>
                </tr>
              </thead>
              <tbody id="course_training"></tbody>
            </table>
          </div>


          <div style="overflow-x:unset" class="card-datatable table-responsive pt-0">
            <table id="table" class="table table-sm">
              <thead>
                <tr>
                  <th colspan="6" class="table-secondary py-1">{{lang('Recruitment certificate')}} <span class="text-danger">*</span></th>
                  <th class="text-end table-secondary">
                    <button type="button" style="margin-top:5px" target="#certificate" prefix="certificate" class="btn btn-add-rows-certificate btn-sm btn-success">+</button>
                  </th>
                </tr>
                <tr>
                  <th>{{lang('Recruitment Field / Type')}}</th>
                  <th>{{lang('Recruitment Organizer')}}</th>
                  <th>{{lang('Recruitment Place / City')}}</th>
                  <th colspan="2">{{lang('Recruitment Validity period')}}</th>
                  <th>{{lang('Recruitment Funded By')}}</th>
                </tr>
              </thead>
              <tbody id="certificate"></tbody>
            </table>
          </div>


          <div style="overflow-x:unset" class="card-datatable table-responsive pt-0">
            <table id="table" class="table table-sm">
              <thead>
                <tr>
                  <th colspan="5" class="table-secondary py-1">{{lang('Recruitment language ability (Filled with : Very Good, Good, Enough)')}} <span class="text-danger">*</span></th>
                  <th class="text-end table-secondary">
                    <button type="button" style="margin-top:5px" target="#language_ability" prefix="language_ability" class="btn btn-add-rows-language_ability btn-sm btn-success">+</button>
                  </th>
                </tr>
                <tr>
                  <th>{{lang('Recruitment Kinds of Languages')}}</th>
                  <th>{{lang('Recruitment Hear')}}</th>
                  <th>{{lang('Recruitment Read')}}</th>
                  <th>{{lang('Recruitment Write')}}</th>
                  <th>{{lang('Recruitment Speak')}}</th>
                </tr>
              </thead>
              <tbody id="language_ability"></tbody>
            </table>
          </div>


          <div style="overflow-x:unset" class="card-datatable table-responsive pt-0">
            <table id="table" class="table table-sm">
              <thead>
                <tr>
                  <th colspan="5" class="table-secondary py-1">{{lang('Recruitment Social Activities / Organizations')}} <span class="text-danger">*</span></th>
                  <th class="text-end table-secondary">
                    <button type="button" style="margin-top:5px" target="#Social_Activities" prefix="Social_Activities" class="btn btn-add-rows-Social_Activities btn-sm btn-success">+</button>
                  </th>
                </tr>
                <tr>
                  <th rowspan="2">{{lang('Recruitment Social Activities / Organizations')}}</th>
                  <th rowspan="2">{{lang('Recruitment position')}}</th>
                  <th rowspan="2">{{lang('Recruitment city')}}</th>
                  <th colspan="2" class="text-center">{{lang('Recruitment duration')}}</th>
                </tr>
              </thead>
              <tbody id="Social_Activities"></tbody>
            </table>
          </div>


          <div style="overflow-x:unset" class="card-datatable table-responsive pt-0">
            <table id="table" class="table table-sm">
              <thead>
                <tr>
                  <th colspan="3" class="table-secondary py-1">{{lang('Recruitment Leisure Activities: Types of Activities')}} <span class="text-danger">*</span></th>
                  <th class="text-end table-secondary">
                    <button type="button" style="margin-top:5px" target="#Leisure_Activities" prefix="Leisure_Activities" class="btn btn-add-rows-Leisure_Activities btn-sm btn-success">+</button>
                  </th>
                </tr>
                <tr>
                  <th>{{lang('Recruitment Leisure Activities: Types of Activities')}}</th>
                  <th>{{lang('Recruitment active')}}</th>
                  <th>{{lang('Recruitment Passive')}}</th>
                </tr>
              </thead>
              <tbody id="Leisure_Activities"></tbody>
            </table>
          </div>



        </div>
        
      </div>
      

    <div class="d-flex justify-content-between mt-2">
      <button type="button" class="btn btn-outline-primary btn-prev">
        <i data-feather="chevron-left" class="align-middle me-sm-25 me-0"></i>
        <span class="align-middle d-sm-inline-block d-none">{{lang('Recruitment previous')}}</span>
      </button>
      <button type="button" class="btn btn-primary btn-validata" target="form_educational_background" step="4" next="#btn-next4">
        <span class="align-middle d-sm-inline-block d-none">{{lang('Recruitment next')}}</span>
        <i data-feather="chevron-right" class="align-middle ms-sm-25 ms-0"></i>
      </button>
      <button type="button" id="btn-next4" style="display: none" class="btn-next"></button>
    </div>

</div>