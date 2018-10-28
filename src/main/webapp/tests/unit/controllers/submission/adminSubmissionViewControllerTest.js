describe('controller: AdminSubmissionViewController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('vireo');
        module('mock.depositLocationRepo');
        module('mock.emailTemplateRepo');
        module('mock.fieldPredicateRepo');
        module('mock.fieldValue');
        module('mock.fileUploadService');
        module('mock.modalService');
        module('mock.restApi');
        module('mock.sidebarService');
        module('mock.storageService');
        module('mock.submissionRepo');
        module('mock.submissionStatusRepo');
        module('mock.userRepo');
        module('mock.userService');
        module('mock.wsApi');

        inject(function ($anchorScroll, $controller, $location, $route, $routeParams, $rootScope, $window, _DepositLocationRepo_, _EmailTemplateRepo_, _FieldPredicateRepo_, _FieldValue_, _FileUploadService_, _ModalService_, _RestApi_, _SidebarService_, _StorageService_, _SubmissionRepo_, _SubmissionStatuses_, _SubmissionStatusRepo_, _UserRepo_, _UserService_, _WsApi_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('AdminSubmissionViewController', {
                $anchorScroll: $anchorScroll,
                $location: $location,
                $route: $route,
                $routeParams: $routeParams,
                $scope: scope,
                $window: $window,
                DepositLocationRepo: _DepositLocationRepo_,
                EmailTemplateRepo: _EmailTemplateRepo_,
                FieldPredicateRepo: _FieldPredicateRepo_,
                FieldValue: _FieldValue_,
                FileUploadService: _FileUploadService_,
                ModalService: _ModalService_,
                RestApi: _RestApi_,
                SidebarService: _SidebarService_,
                StorageService: _StorageService_,
                SubmissionRepo: _SubmissionRepo_,
                SubmissionStatuses: _SubmissionStatuses_,
                SubmissionStatusRepo: _SubmissionStatusRepo_,
                UserRepo: _UserRepo_,
                UserService: _UserService_,
                WsApi: _WsApi_
            });

            // ensure that the isReady() is called.
            scope.$digest();
        });
    });

    /*describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });*/

});