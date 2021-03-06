'use strict';

angular.module('copayApp.controllers').controller('preferencesAliasController',
  function($scope, $timeout, $stateParams, $ionicHistory, configService, profileService, walletService, $ionicNavBarDelegate) {
    var wallet = profileService.getWallet($stateParams.walletId);
    var walletId = wallet.credentials.walletId;
    var config = configService.getSync();

    $scope.walletName = wallet.credentials.walletName;
    $scope.walletAlias = config.aliasFor && config.aliasFor[walletId] ? config.aliasFor[walletId] : wallet.credentials.walletName;
    $scope.alias = {
      value: $scope.walletAlias
    };

    $scope.save = function() {
      var opts = {
        aliasFor: {}
      };

      // Reject reserved wallet names
      if($scope.alias.value == 'Private Spending Wallet') {
        return;
      }

      opts.aliasFor[walletId] = $scope.alias.value;

      configService.set(opts, function(err) {
        if (err) $log.warn(err);
        $ionicHistory.goBack();
      });
    };

    $scope.$on("$ionicView.enter", function(event, data) {
      $ionicNavBarDelegate.showBar(true);
    });
  });
