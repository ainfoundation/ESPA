import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Cropper from 'react-easy-crop';
import { ArrowLeft, BookOpen, Users, LayoutDashboard, Search, ArrowRightLeft, Settings, LogOut, Menu, Plus, Filter, AlertCircle, X, CheckCircle2, BarChart3, Wallet, User, Lock, PanelLeftClose, PanelLeft, Building, Edit, Info, Mail, Copy, MoreVertical, Download, Upload, Trash2, Ban, RefreshCcw, Archive, History, Eye, EyeOff, Database, Layers, Shield, DoorOpen, FileText, CheckSquare, Printer, Send, Globe, CalendarDays, ClipboardList, Type, AlignLeft, Hash, Phone, Calendar, ChevronDown, ChevronUp, CircleDot, MousePointerClick, CheckSquare as CheckSquareIcon, Heading2, Minus, LayoutTemplate, UploadCloud, PenTool, Image as ImageIcon, Key, Briefcase, MapPin, Bell, Loader2, PenLine } from 'lucide-react';
import { countryCodes } from '../management/countryCodes';
import { countries } from '../management/countries';
import FlightDetailsForm from '../management/components/FlightDetailsForm';
import DraggableModal from '../management/components/DraggableModal';
import { ActionMenu, ConfirmModal, ToggleSwitch, UserLink, DataModal, SignaturePad } from '../management/components/SharedComponents';

// Views
import ItineraryView from '../management/views/ItineraryView';
import FormsView from '../management/views/FormsView';
import UsersView from '../management/views/UsersView';
import SettingsView from '../management/views/SettingsView';
import ArchivesView from '../management/views/ArchivesView';
import GeneralAgreementsView from '../management/views/GeneralAgreementsView';

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

export const AinManagementLogo = ({ className = "w-[120px] h-auto" }) => (
  <svg className={className} viewBox="0 0 610 316" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M214.728 160H149.228L138.728 191H93.9775L157.478 15.5H206.978L270.478 191H225.228L214.728 160ZM203.728 127L181.978 62.75L160.478 127H203.728ZM325.054 15.5V191H282.304V15.5H325.054ZM505.534 191H462.784L391.284 82.75V191H348.534V15.5H391.284L462.784 124.25V15.5H505.534V191Z" fill="#004B36"/>
    <path d="M89.5305 231.934V292H81.6317V247.211L61.6677 292H56.1125L36.0617 247.124V292H28.1629V231.934H36.6693L58.8901 281.584L81.1109 231.934H89.5305ZM97.371 268.043C97.371 263.182 98.3547 258.929 100.322 255.284C102.29 251.58 104.98 248.716 108.395 246.69C111.867 244.665 115.715 243.652 119.939 243.652C124.105 243.652 127.722 244.549 130.789 246.343C133.856 248.137 136.142 250.394 137.646 253.114V244.434H145.632V292H137.646V283.146C136.084 285.924 133.74 288.239 130.615 290.09C127.548 291.884 123.961 292.781 119.852 292.781C115.628 292.781 111.809 291.74 108.395 289.656C104.98 287.573 102.29 284.651 100.322 280.89C98.3547 277.128 97.371 272.846 97.371 268.043ZM137.646 268.13C137.646 264.542 136.923 261.417 135.476 258.756C134.03 256.094 132.062 254.068 129.574 252.68C127.143 251.233 124.453 250.51 121.501 250.51C118.55 250.51 115.859 251.204 113.429 252.593C110.999 253.982 109.06 256.007 107.613 258.669C106.167 261.331 105.443 264.455 105.443 268.043C105.443 271.689 106.167 274.871 107.613 277.591C109.06 280.253 110.999 282.307 113.429 283.754C115.859 285.143 118.55 285.837 121.501 285.837C124.453 285.837 127.143 285.143 129.574 283.754C132.062 282.307 134.03 280.253 135.476 277.591C136.923 274.871 137.646 271.718 137.646 268.13ZM179.552 243.566C185.338 243.566 190.025 245.331 193.613 248.86C197.201 252.332 198.995 257.367 198.995 263.964V292H191.183V265.092C191.183 260.347 189.997 256.73 187.624 254.242C185.251 251.696 182.011 250.423 177.902 250.423C173.736 250.423 170.409 251.725 167.92 254.329C165.49 256.933 164.275 260.723 164.275 265.7V292H156.376V244.434H164.275V251.204C165.837 248.774 167.949 246.893 170.611 245.562C173.331 244.231 176.311 243.566 179.552 243.566ZM206.342 268.043C206.342 263.182 207.326 258.929 209.293 255.284C211.261 251.58 213.952 248.716 217.366 246.69C220.838 244.665 224.686 243.652 228.91 243.652C233.077 243.652 236.693 244.549 239.76 246.343C242.827 248.137 245.113 250.394 246.617 253.114V244.434H254.603V292H246.617V283.146C245.055 285.924 242.711 288.239 239.587 290.09C236.52 291.884 232.932 292.781 228.823 292.781C224.599 292.781 220.78 291.74 217.366 289.656C213.952 287.573 211.261 284.651 209.293 280.89C207.326 277.128 206.342 272.846 206.342 268.043ZM246.617 268.13C246.617 264.542 245.894 261.417 244.447 258.756C243.001 256.094 241.033 254.068 238.545 252.68C236.115 251.233 233.424 250.51 230.473 250.51C227.521 250.51 224.831 251.204 222.4 252.593C219.97 253.982 218.031 256.007 216.585 258.669C215.138 261.331 214.415 264.455 214.415 268.043C214.415 271.689 215.138 274.871 216.585 277.591C218.031 280.253 219.97 282.307 222.4 283.754C224.831 285.143 227.521 285.837 230.473 285.837C233.424 285.837 236.115 285.143 238.545 283.754C241.033 282.307 243.001 280.253 244.447 277.591C245.894 274.871 246.617 271.718 246.617 268.13ZM284.964 243.652C289.073 243.652 292.66 244.549 295.727 246.343C298.852 248.137 301.167 250.394 302.671 253.114V244.434H310.657V293.042C310.657 297.382 309.731 301.23 307.879 304.586C306.028 308 303.366 310.662 299.894 312.572C296.48 314.481 292.487 315.436 287.915 315.436C281.666 315.436 276.458 313.96 272.291 311.009C268.125 308.058 265.666 304.036 264.913 298.944H272.725C273.593 301.837 275.387 304.152 278.107 305.888C280.827 307.682 284.096 308.579 287.915 308.579C292.255 308.579 295.785 307.219 298.505 304.499C301.283 301.779 302.671 297.96 302.671 293.042V283.06C301.109 285.837 298.794 288.152 295.727 290.004C292.66 291.855 289.073 292.781 284.964 292.781C280.74 292.781 276.892 291.74 273.42 289.656C270.006 287.573 267.315 284.651 265.347 280.89C263.38 277.128 262.396 272.846 262.396 268.043C262.396 263.182 263.38 258.929 265.347 255.284C267.315 251.58 270.006 248.716 273.42 246.69C276.892 244.665 280.74 243.652 284.964 243.652ZM302.671 268.13C302.671 264.542 301.948 261.417 300.501 258.756C299.055 256.094 297.087 254.068 294.599 252.68C292.168 251.233 289.478 250.51 286.526 250.51C283.575 250.51 280.884 251.204 278.454 252.593C276.024 253.982 274.085 256.007 272.638 258.669C271.192 261.331 270.468 264.455 270.468 268.043C270.468 271.689 271.192 274.871 272.638 277.591C274.085 280.253 276.024 282.307 278.454 283.754C280.884 285.143 283.575 285.837 286.526 285.837C289.478 285.837 292.168 285.143 294.599 283.754C297.087 282.307 299.055 280.253 300.501 277.591C301.948 274.871 302.671 271.718 302.671 268.13ZM364.801 266.394C364.801 267.899 364.714 269.49 364.541 271.168H326.522C326.812 275.855 328.403 279.53 331.296 282.192C334.248 284.796 337.806 286.098 341.973 286.098C345.387 286.098 348.222 285.316 350.479 283.754C352.794 282.134 354.414 279.993 355.34 277.331H363.846C362.573 281.902 360.027 285.635 356.208 288.528C352.389 291.363 347.644 292.781 341.973 292.781C337.459 292.781 333.408 291.769 329.821 289.743C326.291 287.718 323.513 284.853 321.488 281.15C319.463 277.389 318.45 273.049 318.45 268.13C318.45 263.211 319.434 258.9 321.401 255.197C323.369 251.493 326.117 248.658 329.647 246.69C333.235 244.665 337.343 243.652 341.973 243.652C346.486 243.652 350.479 244.636 353.951 246.604C357.423 248.571 360.085 251.291 361.937 254.763C363.846 258.177 364.801 262.054 364.801 266.394ZM356.642 264.745C356.642 261.736 355.976 259.161 354.646 257.02C353.315 254.821 351.492 253.171 349.177 252.072C346.92 250.915 344.403 250.336 341.626 250.336C337.633 250.336 334.219 251.609 331.383 254.155C328.606 256.701 327.014 260.231 326.609 264.745H356.642ZM429.825 243.566C433.528 243.566 436.826 244.347 439.72 245.909C442.613 247.414 444.899 249.699 446.577 252.766C448.255 255.833 449.094 259.566 449.094 263.964V292H441.282V265.092C441.282 260.347 440.096 256.73 437.723 254.242C435.409 251.696 432.255 250.423 428.262 250.423C424.154 250.423 420.884 251.754 418.454 254.416C416.023 257.02 414.808 260.81 414.808 265.786V292H406.996V265.092C406.996 260.347 405.81 256.73 403.437 254.242C401.123 251.696 397.969 250.423 393.976 250.423C389.868 250.423 386.598 251.754 384.168 254.416C381.737 257.02 380.522 260.81 380.522 265.786V292H372.623V244.434H380.522V251.291C382.084 248.803 384.168 246.893 386.772 245.562C389.434 244.231 392.356 243.566 395.539 243.566C399.531 243.566 403.061 244.463 406.128 246.256C409.195 248.05 411.481 250.683 412.985 254.155C414.316 250.799 416.515 248.195 419.582 246.343C422.649 244.491 426.063 243.566 429.825 243.566ZM502.847 266.394C502.847 267.899 502.76 269.49 502.587 271.168H464.568C464.858 275.855 466.449 279.53 469.342 282.192C472.293 284.796 475.852 286.098 480.019 286.098C483.433 286.098 486.268 285.316 488.525 283.754C490.84 282.134 492.46 279.993 493.386 277.331H501.892C500.619 281.902 498.073 285.635 494.254 288.528C490.435 291.363 485.69 292.781 480.019 292.781C475.505 292.781 471.454 291.769 467.867 289.743C464.337 287.718 461.559 284.853 459.534 281.15C457.508 277.389 456.496 273.049 456.496 268.13C456.496 263.211 457.48 258.9 459.447 255.197C461.414 251.493 464.163 248.658 467.693 246.69C471.281 244.665 475.389 243.652 480.019 243.652C484.532 243.652 488.525 244.636 491.997 246.604C495.469 248.571 498.131 251.291 499.983 254.763C501.892 258.177 502.847 262.054 502.847 266.394ZM494.688 264.745C494.688 261.736 494.022 259.161 492.691 257.02C491.36 254.821 489.538 253.171 487.223 252.072C484.966 250.915 482.449 250.336 479.671 250.336C475.679 250.336 472.264 251.609 469.429 254.155C466.651 256.701 465.06 260.231 464.655 264.745H494.688ZM533.845 243.566C539.631 243.566 544.319 245.331 547.906 248.86C551.494 252.332 553.288 257.367 553.288 263.964V292H545.476V265.092C545.476 260.347 544.29 256.73 541.917 254.242C539.545 251.696 536.304 250.423 532.196 250.423C528.029 250.423 524.702 251.725 522.214 254.329C519.783 256.933 518.568 260.723 518.568 265.7V292H510.669V244.434H518.568V251.204C520.13 248.774 522.243 246.893 524.904 245.562C527.624 244.231 530.604 243.566 533.845 243.566ZM573.221 250.944V278.98C573.221 281.295 573.713 282.944 574.697 283.928C575.681 284.853 577.388 285.316 579.818 285.316H585.634V292H578.516C574.118 292 570.82 290.987 568.621 288.962C566.422 286.937 565.323 283.609 565.323 278.98V250.944H559.16V244.434H565.323V232.455H573.221V244.434H585.634V250.944H573.221Z" fill="#004B36"/>
  </svg>
);

export const AINFoundationLogo = ({ width = 599, height = 296, className = "" }) => (
  <svg width={width} height={height} viewBox="0 0 599 296" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M208.728 160H143.228L132.728 191H87.9775L151.478 15.5H200.978L264.478 191H219.228L208.728 160ZM197.728 127L175.978 62.75L154.478 127H197.728ZM319.054 15.5V191H276.304V15.5H319.054ZM499.534 191H456.784L385.284 82.75V191H342.534V15.5H385.284L456.784 124.25V15.5H499.534V191Z" fill="#004B36"/>
    <path d="M115.265 231.5V237.924H88.9649V258.322H110.318V264.745H88.9649V292H81.0661V231.5H115.265ZM142.946 292.781C138.491 292.781 134.44 291.769 130.794 289.743C127.207 287.718 124.371 284.853 122.288 281.15C120.263 277.389 119.25 273.049 119.25 268.13C119.25 263.269 120.292 258.987 122.375 255.284C124.516 251.522 127.409 248.658 131.055 246.69C134.7 244.665 138.78 243.652 143.294 243.652C147.807 243.652 151.887 244.665 155.532 246.69C159.178 248.658 162.042 251.493 164.126 255.197C166.267 258.9 167.337 263.211 167.337 268.13C167.337 273.049 166.238 277.389 164.039 281.15C161.898 284.853 158.975 287.718 155.272 289.743C151.569 291.769 147.46 292.781 142.946 292.781ZM142.946 285.837C145.782 285.837 148.444 285.172 150.932 283.841C153.42 282.51 155.417 280.513 156.921 277.852C158.484 275.19 159.265 271.949 159.265 268.13C159.265 264.311 158.513 261.07 157.008 258.408C155.503 255.747 153.536 253.779 151.106 252.506C148.675 251.175 146.042 250.51 143.207 250.51C140.313 250.51 137.652 251.175 135.221 252.506C132.849 253.779 130.939 255.747 129.492 258.408C128.046 261.07 127.322 264.311 127.322 268.13C127.322 272.007 128.017 275.277 129.406 277.938C130.852 280.6 132.762 282.597 135.134 283.928C137.507 285.201 140.111 285.837 142.946 285.837ZM217.303 244.434V292H209.405V284.969C207.9 287.4 205.788 289.309 203.068 290.698C200.406 292.029 197.455 292.694 194.215 292.694C190.511 292.694 187.184 291.942 184.233 290.438C181.281 288.875 178.938 286.561 177.202 283.494C175.524 280.427 174.685 276.694 174.685 272.296V244.434H182.497V271.255C182.497 275.942 183.683 279.559 186.055 282.105C188.428 284.593 191.669 285.837 195.777 285.837C200.001 285.837 203.329 284.535 205.759 281.931C208.189 279.327 209.405 275.537 209.405 270.56V244.434H217.303ZM251.212 243.566C256.998 243.566 261.686 245.331 265.273 248.86C268.861 252.332 270.655 257.367 270.655 263.964V292H262.843V265.092C262.843 260.347 261.657 256.73 259.284 254.242C256.912 251.696 253.671 250.423 249.563 250.423C245.396 250.423 242.069 251.725 239.581 254.329C237.15 256.933 235.935 260.723 235.935 265.7V292H228.036V244.434H235.935V251.204C237.497 248.774 239.61 246.893 242.271 245.562C244.991 244.231 247.971 243.566 251.212 243.566ZM278.002 268.043C278.002 263.182 278.986 258.929 280.954 255.284C282.921 251.58 285.612 248.716 289.026 246.69C292.498 244.665 296.375 243.652 300.657 243.652C304.361 243.652 307.804 244.52 310.986 246.256C314.169 247.935 316.6 250.162 318.278 252.94V227.768H326.263V292H318.278V283.06C316.715 285.895 314.401 288.239 311.334 290.09C308.267 291.884 304.679 292.781 300.57 292.781C296.346 292.781 292.498 291.74 289.026 289.656C285.612 287.573 282.921 284.651 280.954 280.89C278.986 277.128 278.002 272.846 278.002 268.043ZM318.278 268.13C318.278 264.542 317.554 261.417 316.108 258.756C314.661 256.094 312.694 254.068 310.205 252.68C307.775 251.233 305.084 250.51 302.133 250.51C299.182 250.51 296.491 251.204 294.06 252.593C291.63 253.982 289.692 256.007 288.245 258.669C286.798 261.331 286.075 264.455 286.075 268.043C286.075 271.689 286.798 274.871 288.245 277.591C289.692 280.253 291.63 282.307 294.06 283.754C296.491 285.143 299.182 285.837 302.133 285.837C305.084 285.837 307.775 285.143 310.205 283.754C312.694 282.307 314.661 280.253 316.108 277.591C317.554 274.871 318.278 271.718 318.278 268.13ZM334.056 268.043C334.056 263.182 335.04 258.929 337.007 255.284C338.975 251.58 341.666 248.716 345.08 246.69C348.552 244.665 352.4 243.652 356.624 243.652C360.791 243.652 364.407 244.549 367.474 246.343C370.541 248.137 372.827 250.394 374.331 253.114V244.434H382.317V292H374.331V283.146C372.769 285.924 370.425 288.239 367.301 290.09C364.234 291.884 360.646 292.781 356.537 292.781C352.313 292.781 348.494 291.74 345.08 289.656C341.666 287.573 338.975 284.651 337.007 280.89C335.04 277.128 334.056 272.846 334.056 268.043ZM374.331 268.13C374.331 264.542 373.608 261.417 372.161 258.756C370.715 256.094 368.747 254.068 366.259 252.68C363.829 251.233 361.138 250.51 358.187 250.51C355.235 250.51 352.545 251.204 350.114 252.593C347.684 253.982 345.745 256.007 344.299 258.669C342.852 261.331 342.129 264.455 342.129 268.043C342.129 271.689 342.852 274.871 344.299 277.591C345.745 280.253 347.684 282.307 350.114 283.754C352.545 285.143 355.235 285.837 358.187 285.837C361.138 285.837 363.829 285.143 366.259 283.754C368.747 282.307 370.715 280.253 372.161 277.591C373.608 274.871 374.331 271.718 374.331 268.13ZM402.696 250.944V278.98C402.696 281.295 403.188 282.944 404.172 283.928C405.155 284.853 406.862 285.316 409.293 285.316H415.108V292H407.991C403.593 292 400.295 290.987 398.096 288.962C395.897 286.937 394.797 283.609 394.797 278.98V250.944H388.634V244.434H394.797V232.455H402.696V244.434H415.108V250.944H402.696ZM426.154 236.708C424.65 236.708 423.377 236.188 422.335 235.146C421.294 234.104 420.773 232.831 420.773 231.327C420.773 229.822 421.294 228.549 422.335 227.508C423.377 226.466 424.65 225.945 426.154 225.945C427.601 225.945 428.816 226.466 429.8 227.508C430.842 228.549 431.362 229.822 431.362 231.327C431.362 232.831 430.842 234.104 429.8 235.146C428.816 236.188 427.601 236.708 426.154 236.708ZM429.974 244.434V292H422.075V244.434H429.974ZM461.577 292.781C457.121 292.781 453.071 291.769 449.425 289.743C445.837 287.718 443.002 284.853 440.919 281.15C438.893 277.389 437.881 273.049 437.881 268.13C437.881 263.269 438.922 258.987 441.005 255.284C443.146 251.522 446.04 248.658 449.685 246.69C453.331 244.665 457.411 243.652 461.924 243.652C466.438 243.652 470.517 244.665 474.163 246.69C477.809 248.658 480.673 251.493 482.756 255.197C484.897 258.9 485.968 263.211 485.968 268.13C485.968 273.049 484.868 277.389 482.669 281.15C480.528 284.853 477.606 287.718 473.903 289.743C470.199 291.769 466.091 292.781 461.577 292.781ZM461.577 285.837C464.412 285.837 467.074 285.172 469.563 283.841C472.051 282.51 474.047 280.513 475.552 277.852C477.114 275.19 477.895 271.949 477.895 268.13C477.895 264.311 477.143 261.07 475.639 258.408C474.134 255.747 472.167 253.779 469.736 252.506C467.306 251.175 464.673 250.51 461.837 250.51C458.944 250.51 456.282 251.175 453.852 252.506C451.479 253.779 449.57 255.747 448.123 258.408C446.676 261.07 445.953 264.311 445.953 268.13C445.953 272.007 446.647 275.277 448.036 277.938C449.483 280.6 451.392 282.597 453.765 283.928C456.138 285.201 458.742 285.837 461.577 285.837ZM516.925 243.566C522.712 243.566 527.399 245.331 530.987 248.86C534.574 252.332 536.368 257.367 536.368 263.964V292H528.556V265.092C528.556 260.347 527.37 256.73 524.997 254.242C522.625 251.696 519.384 250.423 515.276 250.423C511.109 250.423 507.782 251.725 505.294 254.329C502.863 256.933 501.648 260.723 501.648 265.7V292H493.749V244.434H501.648V251.204C503.211 248.774 505.323 246.893 507.985 245.562C510.704 244.231 513.684 243.566 516.925 243.566Z" fill="#004B36"/>
  </svg>
);

const AINLogo = ({ className = "" }) => (
  <svg width="184" height="71" viewBox="0 0 184 71" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M55.691 57.8002H29.491L25.291 70.2002H7.39102L32.791 0.000193119H52.591L77.991 70.2002H59.891L55.691 57.8002ZM51.291 44.6002L42.591 18.9002L33.991 44.6002H51.291ZM99.8215 0.000193119V70.2002H82.7215V0.000193119H99.8215ZM172.014 70.2002H154.914L126.314 26.9002V70.2002H109.214V0.000193119H126.314L154.914 43.5002V0.000193119H172.014V70.2002Z" fill="#004B36"/>
  </svg>
);

const sendEmailNotification = async (to, subject, text) => {
    // Mocked email sender
    console.log(`Sending email to ${to}: ${subject}`);
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default function ManagementApp() {
  const [currentUser, setCurrentUser] = useLocalStorage('ain_currentUser', null);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [toast, setToast] = useState(null);
  
  const [twoFactorConfig, setTwoFactorConfig] = useLocalStorage('ain_twoFactorConfig', { enabled: false, requireForLogin: false, requireForReset: false });
  const [appSettings, setAppSettings] = useLocalStorage('ain_appSettings', { returnTimeframe: 7, lastResetMonth: new Date().getMonth(), lastResetDate: new Date().toISOString() });
  
  const [hosts, setHosts] = useLocalStorage('ain_hosts', []);
  const [archivedHosts, setArchivedHosts] = useLocalStorage('ain_archivedHosts', []);
  const [archivedUsers, setArchivedUsers] = useLocalStorage('ain_archivedUsers', []);
  const [archivedBatches, setArchivedBatches] = useLocalStorage('ain_archivedBatches', []);
  const [users, setUsers] = useLocalStorage('ain_users', []);
  const [batches, setBatches] = useLocalStorage('ain_batches', []);
  const [rooms, setRooms] = useLocalStorage('ain_rooms', []);
  const [agreements, setAgreements] = useLocalStorage('ain_agreements', []);
  const [events, setEvents] = useLocalStorage('ain_events', []);
  const [forms, setForms] = useLocalStorage('ain_forms', []);
  const [resources, setResources] = useLocalStorage('ain_resources', []);
  const [notifications, setNotifications] = useLocalStorage('ain_notifications', []);
  const [roles, setRoles] = useLocalStorage('ain_roles', []);
  const [logs, setLogs] = useLocalStorage('ain_logs', []);
  
  const [selectedGlobalUser, setSelectedGlobalUser] = useState(null);

  const showToast = (message, type = 'success', duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  const addLog = (action, userOverride) => {
    const ipBytes = Array.from({length: 4}, () => Math.floor(Math.random() * 255)).join('.');
    const mockIp = `192.168.${ipBytes.split('.')[2]}.${ipBytes.split('.')[3]}`;
    setLogs(prev => [{
      id: Date.now() + Math.random(),
      action,
      user: userOverride || (currentUser ? currentUser.name : 'Unknown User'),
      date: new Date().toISOString(),
      ip: mockIp
    }, ...prev]);
  };

  const executeLogout = () => {
      addLog('Logged out successfully', currentUser?.name);
      setCurrentUser(null);
  };

  if (!currentUser) {
      // Return login screen here
      return <LoginScreen onLogin={setCurrentUser} twoFactorConfig={twoFactorConfig} users={users} setUsers={setUsers} hosts={hosts} addLog={addLog} showToast={showToast} batches={batches} roles={roles} />
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#FDFCFB] text-stone-800 antialiased selection:bg-[#004B36] selection:text-white font-sans">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar currentUser={currentUser} activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onLogout={executeLogout} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header currentUser={currentUser} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} setActiveTab={setActiveTab}  />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-12 transition-all duration-300">
            <div className="max-w-6xl mx-auto">
                {activeTab === 'dashboard' && <div className="text-xl p-8">Welcome to the Dashboard</div>}
                {activeTab === 'users' && <UsersView users={users} setUsers={setUsers} globalUsers={users} batches={batches} roles={roles} hosts={hosts} currentUser={currentUser} archivedUsers={archivedUsers} setArchivedUsers={setArchivedUsers} addLog={addLog} showToast={showToast} onUserClick={setSelectedGlobalUser} setActiveTab={setActiveTab} />}
                {activeTab === 'itinerary' && <ItineraryView users={users} setUsers={setUsers} globalUsers={users} showToast={showToast} addLog={addLog} currentUser={currentUser} />}
                {activeTab === 'forms' && <FormsView forms={forms} setForms={setForms} currentUser={currentUser} globalUsers={users} addLog={addLog} showToast={showToast} onUserClick={setSelectedGlobalUser} archivedForms={[]} setArchivedForms={()=>{}} />}
                {activeTab === 'settings' && <SettingsView currentUser={currentUser} globalUsers={users} setUsers={setUsers} showToast={showToast} addLog={addLog} twoFactorConfig={twoFactorConfig} setTwoFactorConfig={setTwoFactorConfig} />}
                {activeTab === 'archives' && <ArchivesView archivedHosts={archivedHosts} setArchivedHosts={setArchivedHosts} setHosts={setHosts} hosts={hosts} archivedUsers={archivedUsers} setArchivedUsers={setArchivedUsers} setUsers={setUsers} users={users} archivedBatches={archivedBatches} setArchivedBatches={setArchivedBatches} setBatches={setBatches} batches={batches} archivedRooms={[]} setArchivedRooms={()=>{}} setRooms={setRooms} rooms={rooms} showToast={showToast} addLog={addLog} />}
                {activeTab === 'general-agreements' && <GeneralAgreementsView agreements={agreements} setAgreements={setAgreements} currentUser={currentUser} users={users} showToast={showToast} addLog={addLog} setActiveTab={setActiveTab} />}
            </div>
          </main>
        </div>
        {toast && (
          <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-md animate-in slide-in-from-top-5 border print:hidden ${toast.type === 'success' ? 'bg-[#F4F9F7] border-[#E6EFEA] text-[#004B36]' : 'bg-red-50 border-red-200 text-red-700'}`}>
            {toast.type === 'success' ? <CheckCircle2 size={18} className="text-[#004B36]" /> : <AlertCircle size={18} className="text-red-700" />}
            <span className="font-medium text-sm tracking-wide capitalize">{toast.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Sidebar({ currentUser, activeTab, setActiveTab, isOpen, setIsOpen, onLogout }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'itinerary', label: 'Itinerary', icon: MapPin },
    { id: 'forms', label: 'Forms', icon: FileText },
    { id: 'general-agreements', label: 'Agreements', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'archives', label: 'Archives', icon: Archive }
  ];

  return (
    <aside className={`flex-shrink-0 fixed md:relative inset-y-0 left-0 z-50 bg-[#F0EFEA] transition-all duration-300 ease-in-out border-r border-stone-200/60 overflow-hidden ${isOpen ? 'w-[240px]' : 'w-0 md:w-[4.5rem]'}`}>
        <div className="h-full flex flex-col">
            <div className="pt-6 pb-4 flex justify-center">
                <AinManagementLogo className={isOpen ? 'w-24' : 'w-10'} />
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map(item => (
                <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-[#E4E2DC] text-[#004B36]' : 'text-stone-900 hover:bg-stone-200/50 hover:text-[#004B36]'}`}
                >
                <item.icon size={20} className="text-[#004B36] flex-shrink-0" />
                {isOpen && <span className="ml-3">{item.label}</span>}
                </button>
            ))}
            </nav>
            <div className="p-4 border-t border-stone-200/60">
                <button onClick={onLogout} className="w-full flex items-center py-2.5 px-3 rounded-xl text-sm font-medium text-stone-900 hover:bg-stone-200/50">
                    <LogOut size={20} className="text-[#004B36] flex-shrink-0" />
                    {isOpen && <span className="ml-3">Sign Out</span>}
                </button>
            </div>
        </div>
    </aside>
  );
}

function Header({ currentUser, isOpen, setIsOpen, setActiveTab }) {
    return (
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 border-b border-stone-200/60 bg-[#FDFCFB]">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-stone-400 hover:text-[#004B36] rounded-full hover:bg-stone-100">
                <Menu size={20} />
            </button>
            <div className="font-semibold text-stone-900">
                {currentUser.name}
            </div>
        </header>
    );
}

function LoginScreen({ onLogin, twoFactorConfig, users, setUsers, hosts, addLog, showToast, batches, roles }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Admin bypass
        if (username === 'admin' && password === '12345') {
            onLogin({ id: 'A01', name: 'Admin', role: 'Admin' });
            return;
        }
        
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            onLogin(user);
        } else {
            showToast('Invalid credentials', 'error');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 max-w-sm w-full space-y-6">
                <div className="flex justify-center mb-8">
                    <AinManagementLogo className="w-48" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004B36]" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004B36]" />
                </div>
                <button type="submit" className="w-full bg-[#004B36] text-white py-3 rounded-xl font-bold hover:bg-[#003828] transition-colors">
                    Login
                </button>
            </form>
        </div>
    );
}
