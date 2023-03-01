@extends('layouts/contentLayoutMaster')

@section('title', 'Roles')

@section('vendor-style')
  <!-- Vendor css files -->
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/dataTables.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/responsive.bootstrap5.min.css')) }}">
  <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/buttons.bootstrap5.min.css')) }}">
@endsection
@section('page-style')
  <!-- Page css files -->
  <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
  <link rel="stylesheet" href="{{asset(mix('css/base/plugins/extensions/ext-component-sweet-alerts.css'))}}">
@endsection

@section('content')
<!-- Role cards -->
<div class="row">
  @can('create role')
    <div class="col-xl-4 col-lg-6 col-md-6">
      <div class="card">
        <div class="row">
          <div class="col-sm-5">
            <div class="d-flex align-items-end justify-content-center h-100">
              <img
                src="{{asset('images/illustration/faq-illustrations.svg')}}"
                class="img-fluid mt-2"
                alt="Image"
                width="85"
              />
            </div>
          </div>
          <div class="col-sm-7">
            <div class="card-body text-sm-end text-center ps-sm-0">
              <a
                href="javascript:void(0)"
                data-bs-target="#addRoleModal"
                data-bs-toggle="modal"
                class="stretched-link text-nowrap add-new-role"
              >
                <button class="btn btn-primary mb-1"><i data-feather="plus"></i> Add New Role</button>
              </a>
              <p class="mb-0">Add role, if it does not exist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  @endcan
@if (isset($roles))

  @foreach ($roles as $role)
    <div class="col-xl-4 col-lg-6 col-md-6">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <span>Total {{$role->users_count}} users</span>
          </div>
          <div class="d-flex justify-content-between align-items-end mt-1">
            <div class="role-heading">
              <h4 class="fw-bolder">{{$role->name}}</h4>
              <button type="button" class="btn btn-icon btn-icon rounded-circle btn-flat-primary waves-effect m-0" onclick="edit({{$role->id}})" title="Edit">
                <i data-feather="edit"></i>
              </button>
            </div>

            <span type="button" class="btn btn-icon btn-icon rounded-circle btn-flat-danger waves-effect m-0" onClick="confirmDetele({{$role->id}})" title="Delete">
            <i data-feather="trash"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  @endforeach
@endif
</div>
<!--/ Role cards -->

@include('content/_partials/_modals/add-role')
@endsection

@section('vendor-script')
  <!-- Vendor js files -->>
  <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
  <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
@endsection
@section('page-script')
  <!-- Page js files -->
  <script src="{{ asset(mix('js/scripts/apps/role.js')) }}"></script>
@endsection
