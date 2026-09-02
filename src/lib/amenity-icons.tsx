import { BiCloset } from 'react-icons/bi'
import { FaParking } from 'react-icons/fa'
import { GiSecurityGate, GiWindow } from 'react-icons/gi'
import { LuSofa } from 'react-icons/lu'
import { MdAir, MdBalcony, MdHouseSiding, MdLocalLaundryService } from 'react-icons/md'
import {
  PiAirplaneTilt, PiAnchor, PiArmchair, PiBaby, PiBarbell, PiBasketball, PiBathtub,
  PiBeachBall, PiBed, PiBinoculars, PiBoat, PiBuildingApartment, PiCamera, PiCar,
  PiCoffee, PiCompass, PiCookingPot, PiDesk, PiElevator, PiFire, PiFirstAidKit,
  PiFlower, PiForkKnife, PiGameController, PiGarage, PiGolf, PiGridFour, PiHamburger,
  PiHospital, PiHouse, PiIsland, PiMapPin, PiMapTrifold, PiMartini, PiMicrophoneStage,
  PiMountains, PiMusicNotes, PiOfficeChair, PiPark, PiPawPrint, PiPersonSimpleBike,
  PiPersonSimpleHike, PiPersonSimpleRun, PiPersonSimpleSwim, PiPersonSimpleTaiChi,
  PiRoadHorizon, PiSailboat, PiShieldCheck, PiShoppingBag, PiSoccerBall, PiSolarPanel,
  PiSparkle, PiStar, PiStorefront, PiSunHorizon, PiSwimmingPool, PiTelevision,
  PiTennisBall, PiTreeEvergreen, PiTreePalm, PiUmbrella, PiVolleyball, PiWashingMachine,
  PiWaves, PiWheelchair, PiWifiHigh, PiWind, PiWine,
} from 'react-icons/pi'
import { SiFloorp } from 'react-icons/si'
import { TbMichelinStarGreen } from 'react-icons/tb'

export const AMENITY_ICON_MAP = {
  airplane: PiAirplaneTilt, armchair: PiArmchair, baby: PiBaby, barbell: PiBarbell,
  basketball: PiBasketball, bathtub: PiBathtub, beach: PiBeachBall, bed: PiBed,
  binoculars: PiBinoculars, boat: PiBoat, building: PiBuildingApartment, camera: PiCamera,
  car: PiCar, club: PiHouse, coffee: PiCoffee, compass: PiCompass, cooking: PiCookingPot,
  jacuzzi: PiBathtub, coworking: PiDesk, desk: PiDesk, elevator: PiElevator, fire: PiFire,
  firstAid: PiFirstAidKit, flower: PiFlower, forkKnife: PiForkKnife, game: PiGameController,
  garage: PiGarage, golf: PiGolf, grid: PiGridFour, gym: PiBarbell, hamburger: PiHamburger,
  hospital: PiHospital, house: PiHouse, island: PiIsland, map: PiMapTrifold, mapPin: PiMapPin,
  microphone: PiMicrophoneStage, mountains: PiMountains, music: PiMusicNotes,
  officeChair: PiOfficeChair, park: PiPark, paw: PiPawPrint, pool: PiSwimmingPool,
  restaurant: PiForkKnife, road: PiRoadHorizon, run: PiPersonSimpleRun, sailboat: PiSailboat,
  shield: PiShieldCheck, shopping: PiShoppingBag, 'solar-panel': PiSolarPanel,
  soccer: PiSoccerBall, spa: PiPersonSimpleTaiChi, star: PiStar, storefront: PiStorefront,
  sun: PiSunHorizon, swim: PiPersonSimpleSwim, tennis: PiTennisBall, tourism: PiCamera,
  trail: PiPersonSimpleHike, treeEvergreen: PiTreeEvergreen, treePalm: PiTreePalm,
  umbrella: PiUmbrella, volleyball: PiVolleyball, washing: PiWashingMachine, waves: PiWaves,
  wheelchair: PiWheelchair, wifi: PiWifiHigh, wind: PiWind, wine: PiWine,
  bike: PiPersonSimpleBike, tv: PiTelevision, parking: FaParking, balcony: MdBalcony,
  closet: BiCloset, flooring: SiFloorp, windows: GiWindow, 'air-conditioning': MdAir,
  laundry: MdLocalLaundryService, clubhouse: MdHouseSiding, marina: PiAnchor,
  security: GiSecurityGate, 'pool-bar': PiMartini, 'green-area': TbMichelinStarGreen,
  sofa: LuSofa, 'green-areas': TbMichelinStarGreen, sparkle: PiSparkle,
} as const

export type AmenityIconKey = keyof typeof AMENITY_ICON_MAP

const readableLabel = (key: string) => key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/-/g, ' ')

export const AMENITY_ICON_OPTIONS = Object.entries(AMENITY_ICON_MAP).map(([value, Icon]) => ({
  value: value as AmenityIconKey,
  label: readableLabel(value),
  Icon,
}))

export const isAmenityIconKey = (value: string | null | undefined): value is AmenityIconKey =>
  Boolean(value && value in AMENITY_ICON_MAP)

export const getAmenityIconComponent = (value: string | null | undefined) =>
  isAmenityIconKey(value) ? AMENITY_ICON_MAP[value] : PiStar
