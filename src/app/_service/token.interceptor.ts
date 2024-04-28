import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let _token=localStorage.getItem('token');
  let jwttoken=req.clone({
    setHeaders:{
      Authorization:'bearer '+_token
    }
  })
  return next(jwttoken);
};
