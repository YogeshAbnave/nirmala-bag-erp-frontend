import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { CommonService } from '../http/common.service';
import { SignupService } from '../http/signup.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  debugger
  console.log("route, state 1", route, state)
  const commonService = inject(CommonService);
  const router = inject(Router);
  console.log("commonService.getSession()1", commonService.getSession())

  if (commonService.getSession() && commonService.getSession().token) {
    console.log("commonService.getSession().token2", commonService.getSession().token)
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const authGuardChild: CanActivateChildFn = (childRoute, state) => {
  return LoginGuard(childRoute, state);
};

export const LoginGuard: CanActivateFn = (route, state) => {
  debugger
  console.log("route, state 2", route, state)
  const commonService = inject(CommonService);
  const router = inject(Router);
  console.log("commonService.getSession()3", commonService.getSession())

  if (commonService.getSession() && commonService.getSession().token) {
    console.log("commonService.getSession().token4", commonService.getSession().token)

    router.navigate(['/dashboard']);
    return false;
  } else {
    return true;
  }
};

export const signupGuard: CanActivateFn = (route, state) => {
  const signupService = inject(SignupService);
  const router = inject(Router);
  if (signupService.getSignUpSession() && signupService.getSignUpSession().token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
