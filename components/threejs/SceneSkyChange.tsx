"use client"

import { useContext, useEffect } from "react"
import { global3dctx } from "./Root3d"
import { useTheme } from "next-themes"
import { Sky } from "three/examples/jsm/Addons.js"

const useSceneSkyChange = () => {
  const globalcontext = useContext(global3dctx)
  const { theme } = useTheme()
  useEffect(() => {

    console.log("theme change")
    if (globalcontext.scene) {
      console.log("theme change")
      const sky: Sky = globalcontext.scene.getObjectByName("sky");
      if (!sky) return
      theme == "dark" ? sky.material.uniforms["rayleigh"].value = 0.085 : sky.material.uniforms["rayleigh"].value = 3
    }
  }, [theme])
}

export default useSceneSkyChange
