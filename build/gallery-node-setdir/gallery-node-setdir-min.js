YUI.add("gallery-node-setdir",function(B){var A={ltr:"rtl",rtl:"ltr"};B.Node.addMethod("setDirection",function(E,F){var D,C;if(F==="ltr"||F==="rtl"){D=B.one(E);C=D.getStyle("direction");D.setAttribute("dir",F);D.setStyle("direction",F);D.removeClass(B.ClassNameManager.getClassName(A[F]));D.addClass(B.ClassNameManager.getClassName(F));if(F!==C){B.fire("directionChange",{target:D,dir:F});}}return D;});},"gallery-2010.06.16-19-51",{requires:["classnamemanager","node-base","node-style"]});