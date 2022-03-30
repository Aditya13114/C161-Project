AFRAME.registerComponent("bowling-ball",{
    init:function(){
        this.shootBullet();
    },
    shootBullet:function(){
        window.addEventListener("keydown", (e)=>{
            if(e.key === "l"){
                var bullet = document.createElement("a-entity")
                bullet.setAttribute("geometry", {
                    primitive:"sphere",
                    radius: 0.1,
                })
                bullet.setAttribute("dynamic-body", {
                    shape:"sphere",
                    mass:"0",
                })

            bullet.addEventListener("collide", this.removeBullet)

                bullet.setAttribute("material", "color", "black")
                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")
                bullet.setAttribute("position", {x:pos.x, y:pos.y, z:pos.z})
                //bullet.setAttribute("velocity", {x:0, y:0, z:-1})
                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                bullet.setAttribute("velocity", direction.multiplyScalar(-10))
                var scene = document.querySelector("#scene")
                scene.appendChild(bullet)
            }   
            
        })
    },

    removeBullet:function(e){
        //console.log(e.detail.target.el)
        //console.log(e.detail.body.el)
        var elementHit = e.detail.body.el
        var element = e.detail.target.el
        if(elementHit.id.includes("target")){
            console.log("hit")
            elementHit.setAttribute("material", {
                opacity:0.6,
                transparent:true,
            })
            var impulse = new CANNON.Vec3(-2, 2, 1)
            var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
            elementHit.body.applyImpulse(impulse, worldPoint)
            element.removeEventListener("collide", this.shoot)
            var scene = document.querySelector("#scene")
            scene.removeChild(element)
        }
    }
})