vireo.controller("OrganizationManagementController", function ($controller, $location, $q, $route, $scope, $timeout, AccordionService, AlertService, ApiResponseActions, Organization, OrganizationRepo, OrganizationCategoryRepo, WorkflowStepRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.organizationRepo = OrganizationRepo;

    $scope.workflowStepRepo = WorkflowStepRepo;

    $scope.organizationCategories = OrganizationCategoryRepo.getAll();

    $scope.ready = $q.all([OrganizationRepo.ready(), OrganizationCategoryRepo.ready()]);

    $scope.forms = {};

    $scope.ready.then(function () {
        $scope.resetWorkflowSteps = function () {
            $scope.organizationRepo.clearValidationResults();
            for (var key in $scope.forms) {
                if ($scope.forms[key] !== undefined && !$scope.forms[key].$pristine) {
                    $scope.forms[key].$setPristine();
                    $scope.forms[key].$setUntouched();
                }
            }
            if ($scope.modalData !== undefined && $scope.modalData.refresh !== undefined) {
                $scope.modalData.refresh();
            }
            $scope.modalData = {
                overrideable: true
            };
            $scope.closeModal();
        };

        $scope.resetWorkflowSteps();

        $scope.showOrganizationManagement = function () {
            var selectedOrg = $scope.getSelectedOrganization();
            return selectedOrg !== undefined && selectedOrg.id !== undefined && selectedOrg.id !== 1 || (selectedOrg.id == 1 && $scope.isAdmin());
        };

        $scope.updateOrganization = function (organization) {
            $scope.updatingOrganization = true;
            organization.save().then(function () {
                // update the parent scoped selected organization
                $scope.setSelectedOrganization(organization);
                $scope.updatingOrganization = false;
            });
        };

        $scope.deleteOrganization = function (organization) {
            organization.delete().then(function (res) {
                var apiRes = angular.fromJson(res.body);
                if (apiRes.meta.status !== 'INVALID') {
                    $scope.closeModal();
                    $timeout(function () {
                        AlertService.add(apiRes.meta, 'organization/delete');
                    }, 300);
                } else {
                    $scope.closeModal();
                }
            });
        };

        $scope.cancelDeleteOrganization = function () {
            $scope.closeModal();
            $scope.getSelectedOrganization().clearValidationResults();
        };

        $scope.restoreOrganizationDefaults = function (organization) {
            OrganizationRepo.restoreDefaults(organization).then(function (data) {
                if (data.meta.status !== 'INVALID') {
                    $scope.closeModal();
                    $timeout(function () {
                        AlertService.add(data.meta, 'organization/restore-defaults');
                    }, 300);
                }
            });
        };

        $scope.cancelRestoreOrganizationDefaults = function () {
            $scope.closeModal();
            $scope.getSelectedOrganization().clearValidationResults();
        };

        $scope.addWorkflowStep = function () {
            var name = $scope.modalData.name;
            OrganizationRepo.addWorkflowStep($scope.modalData);
        };

        $scope.deleteWorkflowStep = function (workflowStep) {
            OrganizationRepo.deleteWorkflowStep(workflowStep).then(function (resObj) {
                if (resObj.meta.status === 'SUCCESS') {
                    AccordionService.close(workflowStep.name);
                }
            });
        };

        $scope.updateWorkflowStep = function (workflowStep) {
            OrganizationRepo.setToUpdate(workflowStep.originatingOrganization);
            return OrganizationRepo.updateWorkflowStep(workflowStep);
        };

        $scope.reorderWorkflowStepUp = function (workflowStepID) {
            AccordionService.closeAll();
            return OrganizationRepo.reorderWorkflowSteps("up", workflowStepID);
        };

        $scope.reorderWorkflowStepDown = function (workflowStepID) {
            AccordionService.closeAll();
            return OrganizationRepo.reorderWorkflowSteps("down", workflowStepID);
        };

        $scope.openConfirmDeleteModal = function (step) {
            $scope.openModal('#workflow-step-delete-confirm-' + step.id);
        };

        $scope.resetManageOrganization = function () {
            if ($scope.getSelectedOrganization() !== undefined && $scope.getSelectedOrganization().id !== undefined) {
                $scope.getSelectedOrganization().complete = false;
                $scope.setSelectedOrganization($scope.getSelectedOrganization());
                $scope.getSelectedOrganization().clearValidationResults();
                $scope.getSelectedOrganization().refresh();
            }
        };

        $scope.testBoolean = true;

        OrganizationRepo.listen(function () {
            $scope.resetWorkflowSteps();
        });

        OrganizationRepo.listen(ApiResponseActions.READ, function () {
            $scope.resetManageOrganization();
        });

        OrganizationRepo.listen(ApiResponseActions.BROADCAST, function () {
            $scope.resetManageOrganization();
        });

    });

    $scope.acceptsSubmissions = [{
        "true": "Yes"
    }, {
        "false": "No"
    }];

});
