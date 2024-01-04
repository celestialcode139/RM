import { useState, useEffect } from 'react'
import './App.css'
import Header from "./component/header";
import { Box, Button, Container, Grid, Typography, ButtonGroup } from '@mui/material';
import LinearShaft from "./assets/products/linear_shaft.jpg";
import ShaftSuppoer from "./assets/products/shaft_support.jpeg";
import _2DDrawing from "./assets/products/2d_drawing.jpeg";
import StandardBearing from "./assets/products/CatalogImage.png";
import OpenBearing from "./assets/products/OpenBearing.png";
import Search from "./component/search";
import BackIcon from "./assets/icons/back.png";
import CartIcon from "./assets/icons/icons8-cart-80.png";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import RightArrowIcon from "./assets/images/rightarrow.png";
import LeftArrowIcon from "./assets/images/leftarrow.png";

import * as dat from 'dat.gui'



function App() {
  const [openProduct, setopenProduct] = useState(false);
  const [modelUrl, setmodelUrl] = useState("SSM-6-150");
  const [detailMode, setDetailMode] = useState("specifications");
  const [dimensionUnit, setDimensionUnit] = useState("imperial");
  const [activePrice, setActivePrice] = useState(0);
  const [activeProduct, setactiveProduct] = useState([]);
  const [activeOption, setactiveOption] = useState({
    "Diameter": "d14w",
    "Length": "l6",
    "Material": "mc"
  });

  let productPrices = [
    {
      diameter: "1/2",
      carben_steel: 0.72,
      Stainless_steel: 3.75
    },
    {
      diameter: "5/8",
      carben_steel: 0.76,
      Stainless_steel: 4.05
    },
    {
      diameter: "3/4",
      carben_steel: 0.82,
      Stainless_steel: 5.38
    },
    {
      diameter: "1",
      carben_steel: 1.22,
      Stainless_steel: 7.58
    },
  ];
  let products = [
    {
      id: "1",
      title: "Shaft",
      data: [
        {
          id: "ls",
          image: LinearShaft,
          title: "Linear Shafting",
          productDetails: [
            {
              id: "d",
              title: "Diameter",
              data: [
                {
                  id: 'd14',
                  val: "1/4",
                  url: "SSM-6-150",
                  title: "Diameter"
                },
                {
                  id: 'd38',
                  val: "3/8",
                  url: "SSM-10-150",
                  title: "Diameter"
                },
                {
                  id: 'd12',
                  val: "1/2",
                  url: "SSM-12-150",
                  title: "Diameter"
                },
              ]
            },
            {
              id: "d",
              title: "DiameterMetric",
              data: [
                {
                  id: 'd14',
                  val: "10",
                  url: "SSM-6-150",
                  title: "Diameter"
                },
                {
                  id: 'd12',
                  val: "20",
                  url: "SSM-6-150",
                  title: "Diameter"
                }
              ]
            },
            {
              id: "l",
              title: "Length",
              data: [
                {
                  id: 'l6',
                  val: "6",
                  title: "Length"
                }
              ]
            },
            {
              id: "m",
              title: "Material",
              data: [
                {
                  id: 'mc',
                  val: "Carben Steel",
                  title: "Material"
                },
                {
                  id: 'ms',
                  val: "Stainless Steel",
                  title: "Material"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "2",
      title: "Shaft Support",
      data: [
        {
          id: "ss",
          image: ShaftSuppoer,
          title: "Shaft Support",
          productDetails: [
            {
              id: "ssd",
              title: "Diameter",
              data: [
                {
                  id: 'ssd14',
                  val: "3/5",
                  title: "Diameter"
                }
              ]
            },
            {
              id: "ssl",
              title: "Length",
              data: [
                {
                  id: 'ssl6',
                  val: "47",
                  title: "Length"
                }
              ]
            },
            {
              id: "m",
              title: "Material",
              data: [
                {
                  id: 'ssms',
                  val: "Steel",
                  title: "Material"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "3",
      title: "Bearing",
      data: [
        {
          id: "ss",
          image: StandardBearing,
          title: "Standard",
          productDetails: [
            {
              id: "ssd",
              title: "Diameter",
              data: [
                {
                  id: 'SW4',
                  val: "1",
                  title: "Diameter"
                }
              ]
            },
            {
              id: "ssl",
              title: "Length",
              data: [
                {
                  id: '',
                  val: "47",
                  title: "Length"
                }
              ]
            },
            {
              id: "m",
              title: "Material",
              data: [
                {
                  id: '',
                  val: "Steel",
                  title: "Material"
                }
              ]
            }
          ]
        },
        {
          id: "ss",
          image: OpenBearing,
          title: "Open",
          productDetails: [
            {
              id: "ssd",
              title: "Diameter",
              data: [
                {
                  id: 'SWF4',
                  val: "3/5",
                  title: "Diameter"
                }
              ]
            },
            {
              id: "ssl",
              title: "Length",
              data: [
                {
                  id: '',
                  val: "47",
                  title: "Length"
                }
              ]
            },
            {
              id: "m",
              title: "Material",
              data: [
                {
                  id: '',
                  val: "Steel",
                  title: "Material"
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
  }, [activeOption])

  useEffect(() => {
    modelInit(modelUrl);
    console.log("activeOption:", activeOption);
    if (!openProduct) {
      setActivePrice(0)
    } else if (activeOption?.Diameter === "d14" && dimensionUnit === 'metric') {
      setActivePrice(3.60)
    } else if (activeOption?.Diameter === "d14") {
      setActivePrice(3.72)
    } else if (activeOption?.Diameter === "d12" && dimensionUnit === 'metric') {
      setActivePrice(6.50)
    }
    else if (activeOption?.Diameter === "d12") {
      setActivePrice(4.32)
    } else if (activeOption?.Diameter === "d38") {
      setActivePrice(3.96)
    }
  }, [openProduct, activeOption,dimensionUnit])

  const modelInit = (modelLink) => {
    // Variables
    var STL_loader = new STLLoader();
    var GLTF_loader = new GLTFLoader();
    var Font_loader = new FontLoader();
    var textureLoader = new THREE.TextureLoader();
    // Canvas
    const canvas = document.querySelector('canvas.webgl')
    // Scene
    const scene = new THREE.Scene()
    //STL Model
    STL_loader.load(`https://cdn.jsdelivr.net/gh/celestialcode139/RM@0.0.4/src/assets/model/${activeOption.Diameter}${activeOption.Length}${activeOption.Material}.stl`, function (geometry) {
      const material = new THREE.MeshPhongMaterial({ color: "gray", specular: "gray", shininess: 20 });
      var mesh = new THREE.Mesh(geometry, material);


      mesh.scale.set(0.04, 0.04, 0.04);

      // Get the bounding box
      const boundingBox = new THREE.Box3().setFromObject(mesh);
      // Get dimensions
      const dimensions = boundingBox.getSize(new THREE.Vector3());
      mesh.position.x = -dimensions.x / 2;


      Font_loader.load('./src/assets/font/roboto.json', function (font) {

        // LENGTH
        var LengthTextGeo = new TextGeometry(`${dimensions.x.toFixed(0)} in`, {
          font: font,
          size: 0.2,
          height: 0.1,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelSegments: 5

        });
        var LengthTextMat = new THREE.MeshBasicMaterial({ color: 'black' });
        var LengthMesh = new THREE.Mesh(LengthTextGeo, LengthTextMat);
        LengthMesh.position.x = -0.2;
        LengthMesh.position.y = -dimensions.y - 0.5
        // DIAMETER
        var DiameterTextGeo = new TextGeometry(`${dimensions.y.toFixed(0)} in`, {
          font: font,
          size: 0.2,
          height: 0.1,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.005,
          bevelSize: 0.005,
          bevelSegments: 5

        });
        var DiameterTextMat = new THREE.MeshBasicMaterial({ color: 'black' });
        var DiameterMesh = new THREE.Mesh(DiameterTextGeo, DiameterTextMat);

        const DiameterMeshBox = new THREE.Box3().setFromObject(DiameterMesh);
        const DiameterDimensions = DiameterMeshBox.getSize(new THREE.Vector3());
        DiameterMesh.position.x = dimensions.x / 2;
        DiameterMesh.position.y = -dimensions.y - 0.5;

        var rightTexture = textureLoader.load(RightArrowIcon);
        var leftTexture = textureLoader.load(LeftArrowIcon);
        let leftArrowGeo = new THREE.BoxGeometry(1.5, 0.8, 0);
        let leftArrowMat = new THREE.MeshBasicMaterial({ map: leftTexture, transparent: true });
        let rightArrowMat = new THREE.MeshBasicMaterial({ map: rightTexture, transparent: true });
        let leftArrow = new THREE.Mesh(leftArrowGeo, leftArrowMat);
        let RightArrow = new THREE.Mesh(leftArrowGeo, rightArrowMat);
        let TopArrow = new THREE.Mesh(leftArrowGeo, rightArrowMat);
        let BottomArrow = new THREE.Mesh(leftArrowGeo, rightArrowMat);
        leftArrow.position.x = -1;
        leftArrow.position.y = -dimensions.y - 0.36;
        RightArrow.position.x = 1.3;
        RightArrow.position.y = -dimensions.y - 0.36;
        TopArrow.rotation.z = Math.PI / 2;
        TopArrow.position.x = dimensions.x / 2 + DiameterDimensions.x / 2;
        TopArrow.position.y = dimensions.y;
        BottomArrow.rotation.z = -Math.PI / 2;
        BottomArrow.position.x = dimensions.x / 2 + DiameterDimensions.x / 2;
        BottomArrow.position.y = -DiameterDimensions.y - dimensions.y - 0.8 - 0.2;

        openProduct == true ? scene.add(mesh, LengthMesh, DiameterMesh, leftArrow, RightArrow, TopArrow, BottomArrow) : null;
      });
      // const leftTextGeo = new THREE.BoxGeometry(1, 1, 1);

    });


    // Lights
    const pointLight = new THREE.DirectionalLight(0xffffff, 2);
    const pointLightBack = new THREE.DirectionalLight(0xffffff, 2);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);

    pointLight.position.set(1, 1, 4);
    pointLightBack.position.set(1, 1, -4);

    scene.add(pointLight, ambientLight, pointLightBack)

    /**
     * Sizes
     */
    let layoutBody = document.querySelector(".layoutBody");
    const sizes = {
      width: layoutBody.clientWidth - 40,
      height: layoutBody.clientHeight
    }
    window.addEventListener('resize', () => {

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Base Camera
     */

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 10
    scene.add(camera)

    /**
     * Orbit Controls
     */
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      // Render
      renderer.render(scene, camera)
      window.requestAnimationFrame(tick)
    }

    tick()
  }


  return (
    <Box>
      <Header />
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={2.5} className='sidebar'>
            <Typography className='heading' sx={{ mb: 2 }}>Parts</Typography>
            <Search />
            {
              openProduct == false ?
                products.map((product, i) => (
                  <Box key={i}>
                    <Typography className='heading' sx={{ mt: 3, mb: 0.5 }}>{product.title}</Typography>
                    <Grid container spacing={2}>
                      {
                        product?.data.map((item, j) => (
                          <Grid key={j} item xs={4} className='product' onClick={() => {
                            // setactiveProduct();
                            setopenProduct(true);
                            setactiveProduct(item.productDetails);
                            let tempActiveOptions = {};
                            item.productDetails.forEach(e => {
                              tempActiveOptions[e.title] = e.data[0].id
                            });
                            setactiveOption(tempActiveOptions);

                            console.log("tempActiveOptions:", tempActiveOptions);
                          }}>
                            <Box component="img" src={item.image} className="img"></Box>
                            <Typography className='subHeading' sx={{ mt: 3, mb: 0.5 }}>{item.title}</Typography>
                          </Grid>
                        ))
                      }
                    </Grid>
                  </Box>
                ))

                :
                <Box>
                  <Box component="img" src={BackIcon} className='backBtn' onClick={() => {
                    setActivePrice(0)
                    setopenProduct(false)
                  }}></Box>

                  <ButtonGroup sx={{ mt: 3, borderColor: "#000" }} className='' >
                    <Button className={dimensionUnit === "imperial" ? `activeDimentionUintBtn` : `deActiveDimentionUintBtn`} onClick={() => setDimensionUnit("imperial")}  >
                      IMPERIAL
                    </Button>
                    <Button className={`${dimensionUnit === "metric" ? `activeDimentionUintBtn` : `deActiveDimentionUintBtn`}`} onClick={() => setDimensionUnit("metric")} >
                      METRIC
                    </Button>
                  </ButtonGroup>
                  {
                    activeProduct.map((productDetail, i) => (
                      dimensionUnit === "metric" && productDetail.title === "DiameterMetric" ?
                        <Box key={i}>
                          <Typography className='subHeading' sx={{ mt: 3, mb: 0.5 }}>Diameter</Typography>
                          <Grid container spacing={1}>
                            {
                              productDetail.data.map((val, i) => (
                                <Grid key={i} item xs={4} className='product' >
                                  <Button onClick={() => {
                                    setactiveOption({ ...activeOption, [val.title]: val.id });
                                    setmodelUrl(val.url)
                                  }} variant="contained" size="small" className='btn2' sx={{ background: activeOption[val.title] == val.id ? "white" : "#e0e0e0", color: "black" }}>
                                    {val.val} mm
                                  </Button>
                                </Grid>
                              ))
                            }
                          </Grid>
                        </Box>
                        :
                        dimensionUnit === "metric" && productDetail.title === "Diameter" ? null
                          : dimensionUnit === "imperial" && productDetail.title === "DiameterMetric" ? null : <Box key={i}>
                            <Typography className='subHeading' sx={{ mt: 3, mb: 0.5 }}>{productDetail.title}</Typography>
                            <Grid container spacing={1}>
                              {
                                productDetail.data.map((val, i) => (
                                  <Grid key={i} item xs={4} className='product' >
                                    <Button onClick={() => {
                                      setactiveOption({ ...activeOption, [val.title]: val.id });
                                      setmodelUrl(val.url)
                                    }} variant="contained" size="small" className='btn' sx={{ background: activeOption[val.title] == val.id ? "white" : "#e0e0e0", color: "black" }}>
                                      {val.val} in
                                    </Button>
                                  </Grid>
                                ))
                              }
                            </Grid>
                          </Box>
                    ))
                  }

                </Box>
            }

          </Grid>
          <Grid item xs={7} className='layoutBody '>
            <div className='justifyContentEnd' >
              <Button className='btnRed'  >
                <Box component="img" src={CartIcon} className='cartIcon' onClick={() => setopenProduct(false)}></Box>
                Add to Cart
              </Button>
            </div>
            <div className='justifyContentEnd' >
              <Typography className='itemPrice' >$ {activePrice} (CAD)</Typography>
            </div>
            <canvas className="webgl"></canvas>
            <div className='label_div'></div>
          </Grid>
          <Grid item xs={2.5} className='sidebar noPadding'>
            <div className='' >
              <Button className={detailMode === "specifications" ? `activeSideToggle` : `deActiveSideToggle`} onClick={() => setDetailMode("specifications")}  >
                Specifications
              </Button>
              <Button className={`${detailMode === "2d_drawing" ? `activeSideToggle` : `deActiveSideToggle`}`} onClick={() => setDetailMode("2d_drawing")} >
                2D Drawing
              </Button>
            </div>
            <Box sx={{ mt: 3 }} className="justifyContentCenter">
              {

                detailMode === "2d_drawing" ? <Box component="img" src={_2DDrawing} className='_2dDrawingImage' onClick={() => setopenProduct(false)}></Box> : null
              }
              {
                detailMode === "specifications" ?
                  <table style={{ width: "80%", border: "1px!important" }}>
                    <tr>
                      <th>Length of Tolerance</th>
                      <td>+/- 1 MM / +/ 1/16”</td>
                    </tr>
                    <tr>
                      <th>Depth of Hardness</th>
                      <td>0.085”</td>
                    </tr>
                    <tr>
                      <th>Weight</th>
                      <td>0.233 LBS/IN</td>
                    </tr>
                    <tr>
                      <th>Diameter Tolerance</th>
                      <td>0.9995” / 0.9990”</td>
                    </tr>
                    <tr>
                      <th>Material</th>
                      <td>1060 Carbon Steel / CF53 1.1213</td>
                    </tr>
                    <tr>
                      <th>Case Hardness</th>
                      <td>60-65 RC</td>
                    </tr>
                    <tr>
                      <th>End Configuration</th>
                      <td>Break Edge, No Sharp Ends</td>
                    </tr>
                    <tr>
                      <th>Part Number</th>
                      <td>CS 1 L</td>
                    </tr>
                    <tr>
                      <th>Country of Origin</th>
                      <td>Germany</td>
                    </tr>
                    <tr>
                      <th>Angle of Cut</th>
                      <td>Up to 4 DEG</td>
                    </tr>
                  </table>
                  : null
              }
            </Box>
            {/* <Typography className='heading' sx={{ mb: 2 }}>Parts</Typography> */}

          </Grid>
        </Grid>
      </Container>
    </Box >
  )
}

export default App
