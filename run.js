/*
  Created by zijian on 2015/8/26.
 */
/*
t:动画已消耗时间；
b:原始位置；
c:目标位置；
d:动画持续总时间；
*/
var tween={
    liner:function(t,b,c,d){
        return c*t/d+b;
    },
    easeIn:function(t,b,c,d){
        return c*(t/=d)*t+b;
    },
    easeInCubic: function(t,b,c,d){
         return  c*(t/=d)*t*t + b;
    },
    easeOutExpo:function (t,b,c,d){
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b
    },
    strongEaseIn:function(t,b,c,d){
        return c*(t/=d)*t*t*t*t+b;
    },
    strongEaseOut:function(t,b,c,d){
        return c*((t/=d-1)*t*t*t*t+1)+b;
    },
    sineaseIn:function(t,b,c,d){
        return c*(t/=d-1)*t*t+b;
    },
    sineaseOut:function(t,b,c,d){
        return c*((t/=d-1)*t*t+1)+b;
    }
};
 var Animate=function(dom){
     this.dom=dom;        //执行动画的dom节点
     this.startTime= 0;   //动画开始时间
     this.startPos=0;     //执行dom节点的起始位置
     this.endPos= 0;       //结束位置
     this.propertyName=null;//dom节点要改变的属性名（top.left.right）
     this.easing=null;     //动画效果
     this.duration=null;   //动画运动持续时间

 };

 Animate.prototype.start=function( propertyName,endPos,duration,easing){
       this.startTime=+new Date;    //动画启动时间
       this.startPos=this.dom.getBoundingClientRect()[propertyName];//获取dom节点初始位置
       this.propertyName=propertyName;       //dom节点需要被改变的属性名
       this.endPos= endPos;
       this.easing=tween[easing];            //缓动算法
       this.duration=duration;
       var self=this;
       var timeId= setInterval(function(){
          if(self.step()===false){          //动画结束 立即清除
              clearInterval(timeId);
          }
      },19)
 };

   Animate.prototype.step=function(){
     var t=+new Date;        //取得当前时间
     if(t>=this.startTime+this.duration){
         this.update(this.endPos);  //更新dom节点当前位置
          return false;
     }
       var pos=this.easing(t-this.startTime,this.startPos,
               this.endPos-this.startPos,this.duration);//pos为当前位置
        this.update(pos);//更新dom节点属性值
 };

  Animate.prototype.update=function(pos){
      this.dom.style[this.propertyName]=pos+'px';
  };

