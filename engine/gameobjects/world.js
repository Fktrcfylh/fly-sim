var WORLD={
	objects:[],
	lastUpdated:0,

	init:function()
	{
		this.CONTAINER = document.createElement( 'div' );
		document.body.appendChild( this.CONTAINER );

		this.SCENE = new THREE.Scene();
		this.CAMERA= new CAMERA();
		this.SCENE.add(this.CAMERA.get());


		this.RENDERER = new THREE.WebGLRenderer(
				{ 
					antialias: true, 
					clearColor: 0x000000, 
					clearAlpha: 1 
				}
			);
		this.RENDERER.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		this.RENDERER.domElement.style.position = "relative";
		this.CONTAINER.appendChild( this.RENDERER.domElement );
	},
	append:function(p)
	{
		this.objects.push(p);
		this.SCENE.add(p);
		return this.objects.length-1;
	},
	remove:function(p)
	{
		for(var t in this.objects)
		{
			if(this.objects[t]===p)
			{
				delete(this.objects[t]);
				break;
			}
		}
	},
	removeAt:function(i)
	{
		if(this.objects.length-1>i)
		delete(this.objects[i]);
	},
	update:function(time,count)
	{
		for(var i=this.lastUpdated;i<=this.lastUpdated+count || i<=this.objects.length-1;i++)
		{
			if(typeof this.objects[i].update == 'function')
			{
				this.objects[i].update(time);	
			}
		}
		this.lastUpdated+=count;
		if(this.lastUpdated>this.objects.length-1)
			this.lastUpdated=0;
	},
	draw:function()
	{
		this.RENDERER.render( this.SCENE, this.CAMERA.get() );
	}
}