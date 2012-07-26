var CAMERA=function()
{
	var CAMERA   = new THREE.PerspectiveCamera(90,  SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
	var position = new THREE.Vector3(0,0,0);
	var direction= new THREE.Vector3(0,0,1);
	var up       = new THREE.Vector3(0,1,0);
	var distance = 10;
	function lookAt(obj)
	{
		this.TARGET=obj;
	}
	function update()
	{
		this.CAMERA.lookAt(this.TARGET.position);
		this.CAMERA.up(this.TARGET.up);
		this.CAMERA.position.set(
									this.TARGET.position.x-this.TARGET.direction.x*this.distance,
									this.TARGET.position.y-this.TARGET.direction.y*this.distance,
									this.TARGET.position.z-this.TARGET.direction.z*this.distance,
								);
	}
	function get()
	{
		return this.CAMERA;
	}
}

