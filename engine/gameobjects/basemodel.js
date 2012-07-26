var mObject=function(model_name,options)
	{
		var me=this;
		me.deltaR=Math.PI*2;
		me.deltaU=0;
		me.baseObject=new THREE.Object3D();
		me.baseObject.useQuaternion=true;
		scene.add(me.baseObject);
		
		me.position=new THREE.Vector3();
		
		me.baseObject.position=me.position;
		
		
		me.isLoaded=false;
		
		me.fposition=new THREE.Vector3();
		if(typeof options.translation!="undefined")
		{
			me.fposition.x=options.translation[0];
			me.fposition.y=options.translation[1];
			me.fposition.z=options.translation[2];
		}
		me.fscale=new THREE.Vector3();
		
		if(typeof options.fscale!="undefined")
		{
			me.fscale.x=options.fscale[0];
			me.fscale.y=options.fscale[1];
			me.fscale.z=options.fscale[2];
		}
		else
		{
			me.fscale.x=
			me.fscale.y=
			me.fscale.z=1;
		}
		
		
		me.speed=0;
		
		me.direction=new THREE.Vector3();
		me.base_direction=new THREE.Vector3();
		if(typeof options.direction!="undefined")
		{
			me.direction.x=options.direction[0];
			me.direction.y=options.direction[1];
			me.direction.z=options.direction[2];
			
			me.base_direction.x=options.direction[0];
			me.base_direction.y=options.direction[1];
			me.base_direction.z=options.direction[2];
			
		}
		else
		{
			me.direction.x=1;
			me.base_direction.x=1;
		}
		
		me.up=new THREE.Vector3();
		me.base_up=new THREE.Vector3();
		me.right=new THREE.Vector3();
		me.base_right=new THREE.Vector3();
		if(typeof options.up!="undefined")
		{
			me.up.x=options.up[0];
			me.up.y=options.up[1];
			me.up.z=options.up[2];

			me.base_up.x=options.up[0];
			me.base_up.y=options.up[1];
			me.base_up.z=options.up[2];
		}
		else
		{
			me.up.z=1;
			me.base_up.z=1;
		}
		
		
		me.right.cross(me.up,me.direction);
		me.base_right.cross(me.up,me.direction);

		me.rotateTOR=0;
		me.rotateTOU=0;	
		var loader=new THREE.JSONLoader();
		loader.load( model_name, createScene);
		
		function createScene(geometry)
		{
			var model = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
			model.scale=me.fscale;
			model.position=me.fposition;
			model.rotate=me.frotate;
			
			me.baseObject.add(model);
			me.isLoaded=true;
		}
		
		

		me.update=function()
		{
			me.position.x+=me.direction.x*me.speed;
			me.position.y+=me.direction.y*me.speed;
			me.position.z+=me.direction.z*me.speed;
			me.deltaR+=me.rotateTOR;
			me.deltaU+=me.rotateTOU;
			if(me.deltaR>4*Math.PI)me.deltaR=0;
			if(me.deltaU>4*Math.PI)me.deltaU=0;
			if(me.deltaR<0)me.deltaR=4*Math.PI;
			if(me.deltaU<0)me.deltaU=4*Math.PI;
			update_rotate_position();
			//console.log(me.deltaR*180/Math.PI,me.deltaU*180/Math.PI);
		}
		
		me.rotateRight=function(delta)
		{
			me.rotateTOR=delta;

		}
		
		me.rotateUp=function(delta)
		{
			me.rotateTOU=delta;
		}

		function update_rotate_position()
		{

			var q1 = new THREE.Quaternion();
			q1.setFromAxisAngle( me.right, me.deltaU );
			
			q1.multiplyVector3(me.base_direction, me.direction);

			 // me.up.cross(me.direction,me.right);


			var q2 = new THREE.Quaternion();
			q2.setFromAxisAngle( me.up, me.deltaR );
			
			// q2.multiplyVector3(me.direction,me.direction);

			// me.right.cross(me.up,me.direction);

			var q3 = new THREE.Quaternion();
			q3.multiply(q1,q2);

			me.baseObject.quaternion.copy(q3);

			 q3.multiplyVector3( me.base_direction, me.direction );
			 q3.multiplyVector3( me.base_up, me.up );
			// q3.multiplyVector3( me.base_right, me.right );
			 me.right.cross(me.up,me.direction);
			// console.log(me.direction.x,me.direction.y,me.direction.z,me.up.x,me.up.y,me.up.z,me.right.x,me.right.y,me.right.z);
		}
	}