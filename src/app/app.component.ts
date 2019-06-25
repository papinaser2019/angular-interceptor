import {Component, OnInit} from '@angular/core';
import { LoginService } from './services/login.service';
import {ConnectionService} from "ng-connection-service";
declare const ping: any;
declare const ConsoleListener: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular-Interceptor';
  status = 'ONLINE';
  logs=[];
  errors=[];
  debugs=[];
  constructor(public loginService: LoginService,
              private connectionService: ConnectionService) {
    this.loginService.login({}).subscribe(data => {
      console.log(data);
    });

    this.connectionService.monitor().subscribe(isConnected => {
      if (isConnected) {
        this.status = "ONLINE";
      }
      else {
        this.status = "OFFLINE";
      }
    });

  }
  ngOnInit(): void {
    var that = this;
    ConsoleListener.on("error", function (ex,msg,opt) { that.errors.push(ex,msg,opt) });
    //ConsoleListener.on("error", function (ex) { that.errors.push(ex) });

    // this.logs=[];
    // console.stdlog = console.log.bind(console);
    //
    // console.log = function(){
    //   that.logs.push(Array.from(arguments));
    //   console.stdlog.apply(console, arguments);
    // };
    //
    // console.defaultError = console.error.bind(console);
    // this.errors = [];
    // console.error = function(){
    //   // default &  console.error()
    //   console.defaultError.apply(console, arguments);
    //   // new & array data
    //   that.errors.push(Array.from(arguments));
    // };
    //
    // console.defaultDebug = console.debug.bind(console);
    // that.debugs = [];
    // console.debug = function(){
    //   // default &  console.debug()
    //   console.defaultDebug.apply(console, arguments);
    //   // new & array data
    //   that.debugs.push(Array.from(arguments));
    // };
  }

  onGetToken(){
    this.loginService.getToken().subscribe(data => {
      console.log("onGetToken ",data);
    });
  }
  onPing(){
    //ping('http://95.156.253.220').then(function(delta) {
    //ping('https://apidev.penq.ir').then(function(delta) {
    ping('https://apidev.penq.ir:1404').then(function(delta) {
      console.log('Ping time was ' + String(delta) + ' ms');
    }).catch(function(err) {
      console.error('Could not ping remote URL', err);
    });
  }
  readConsoleErrors(){
    console.error = function(err){
      // @ts-ignore
      alert("message:",err.message);

      // default &  console.error()
    }
  }
  getCustomerDetails() {
    this.loginService.getCustomerDetails().subscribe((data) => {
      console.log('----->>>', data);
    });
  }
}
