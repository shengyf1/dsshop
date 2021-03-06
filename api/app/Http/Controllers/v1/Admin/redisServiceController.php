<?php

namespace App\Http\Controllers\v1\admin;

use App\Code;
use App\Http\Requests\v1\SubmitComponentsRequest;
use App\Http\Requests\v1\SubmitSmsServiceRequest;
use App\Http\Requests\v1\SubmitSmsTemplateRequest;
use App\Models\v1\Component;
use App\Models\v1\SmsService;
use App\Models\v1\SmsTemplate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class redisServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->has('type')){
            switch ($request->type){
                case 1:
                    $default= Redis::connection('default');
                    $data['default']=$default->keys('*');
                    break;
                case 2:
                    $cache= Redis::connection('cache');
                    $data['cache']=$cache->keys('*');
                    break;
                case 3:
                    $queue= Redis::connection('queue');
                    $data['queue']=$queue->keys('*');
                    break;
            }
        }else{
            $default= Redis::connection('default');
            $cache= Redis::connection('cache');
            $queue= Redis::connection('queue');
            $data['default']=$default->keys('*');
            $data['cache']=$cache->keys('*');
            $data['queue']=$queue->keys('*');
        }

        $return=array();
        foreach ($data as $key => $d){
            $type=0;
            $db=null;
            switch ($key){
                case 'default':
                    $type='默认';
                    $db=$default;
                    break;
                case 'cache':
                    $type='数据库';
                    $db=$cache;
                    break;
                case 'queue':
                    $type='队列';
                    $db=$queue;
                    break;

            }
            foreach ($d as $value){
                $return[]=array(
                    'name'=>$value, //字段名
                    'type'=>$key,  //类型
                    'type_show'=>$type, //类型
                    'size'=>round($db->strlen($value)/1024,2) //大小KB
                );
            }
        }
        $msg['data']=$return;
        return resReturn(1,$msg);
    }

    //获取Redis详情
    public function show($name,Request $request){
        if(!$request->has('type') || !$name){
            return resReturn(0,'参数有误',Code::CODE_PARAMETER_WRONG);
        }
        $redis= Redis::connection($request->type);
        $data=$redis->get($name);
        $return['type']=0;
        $return['data']=$data;
        if(!is_null(json_decode($data))){
            $return['data']=json_decode($data);
            $return['type']=1;
        }

        return resReturn(1,$return);
    }

    //redis面板
    public function panel(){
        $default= Redis::connection('default');
        $cache= Redis::connection('cache');
        $queue= Redis::connection('queue');
        $data['default']=$default->keys('*');
        $data['cache']=$cache->keys('*');
        $data['queue']=$queue->keys('*');
        $msg['default']=$default->info();
        $msg['cache']=$cache->info();
        $msg['queue']=$queue->info();
        return resReturn(1,$msg);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy($name, Request $request)
    {
        if($name !=1) {
            $redis = Redis::connection($request->type);
            $redis->del($name);
        }else{
            foreach ($request->all() as $all){
                $redis= Redis::connection($all['type']);
                $redis->del($all['name']);
            }
        }
        return resReturn(1,'删除成功');
    }
}
