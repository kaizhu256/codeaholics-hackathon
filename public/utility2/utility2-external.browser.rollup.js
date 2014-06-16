/*jslint browser: true, indent: 2, maxerr: 8, node: true, nomen: true, regexp: true*/
/*global global, required, state, utility2*/
(function initModule() {
  'use strict';
  if (typeof window === 'object') {
    window.global = window.global || window;
  }
  /* init required object */
  global.required = global.required || {};
  return {
    cache: true,
    cachePrefix: '/rollup',
    postProcessing: function (content) {
      return content
        /* mime.types */
        .replace(
          (/(\n\/\* MODULE_BEGIN .*\/mime.types \*\/\n)([\S\s]+?)(\n\/\* MODULE_END \*\/\n)/g),
          function (_, header, content, footer) {
            utility2.nop(_);
            return header + '(function () { required.mime = { lookupDict: { /*'
              + content.replace((/^(\w\S+)\s+(\w.*)$/gm), function (_, value, keyList) {
                utility2.nop(_);
                return '*/' + keyList.replace((/\S+/g), function (key) {
                  return '"' + key + '":"' + value + '",';
                }) + '/*';
              }) + '*/ } }; }());' + footer;
          }
        )
        /* nodejs */
        .replace(
          (/(\n\/\* MODULE_BEGIN https:\/\/raw\.githubusercontent\.com\/joyent\/node\/master\/lib\/(\w+)\.js \*\/\n[\S\s]+?\n\/\* MODULE_END \*\/\n)/g),
          '(function () { var module = {}, exports = module.exports = {},'
            + 'process = global.process || {};'
            + 'require = function (module) { return required[module] };'
            + '$1'
            + 'required.$2 = module.exports; }());'
        );
    },
    urlList: [
      /* mime.types */
      'https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types',
      /* nodejs */
      'https://raw.githubusercontent.com/joyent/node/master/lib/util.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/path.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/punycode.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/querystring.js',
      'https://raw.githubusercontent.com/joyent/node/master/lib/url.js'
    ]
  };
}());
/* MODULE_BEGIN https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types */
(function () { required.mime = { lookupDict: { /*# This file maps Internet media types to unique file extension(s).
# Although created for httpd, this file is used by many software systems
# and has been placed in the public domain for unlimited redisribution.
#
# The table below contains both registered and (common) unregistered types.
# A type that has no unique extension can be ignored -- they are listed
# here to guide configurations toward known types and to make it easier to
# identify "new" types.  File extensions are also commonly used to indicate
# content languages and encodings, so choose them carefully.
#
# Internet media types should be registered as described in RFC 4288.
# The registry is at <http://www.iana.org/assignments/media-types/>.
#
# MIME type (lowercased)			Extensions
# ============================================	==========
# application/1d-interleaved-parityfec
# application/3gpp-ims+xml
# application/activemessage
*/"ez":"application/andrew-inset",/*
# application/applefile
*/"aw":"application/applixware",/*
*/"atom":"application/atom+xml",/*
*/"atomcat":"application/atomcat+xml",/*
# application/atomicmail
*/"atomsvc":"application/atomsvc+xml",/*
# application/auth-policy+xml
# application/batch-smtp
# application/beep+xml
# application/calendar+xml
# application/cals-1840
# application/ccmp+xml
*/"ccxml":"application/ccxml+xml",/*
*/"cdmia":"application/cdmi-capability",/*
*/"cdmic":"application/cdmi-container",/*
*/"cdmid":"application/cdmi-domain",/*
*/"cdmio":"application/cdmi-object",/*
*/"cdmiq":"application/cdmi-queue",/*
# application/cea-2018+xml
# application/cellml+xml
# application/cfw
# application/cnrp+xml
# application/commonground
# application/conference-info+xml
# application/cpl+xml
# application/csta+xml
# application/cstadata+xml
*/"cu":"application/cu-seeme",/*
# application/cybercash
*/"davmount":"application/davmount+xml",/*
# application/dca-rft
# application/dec-dx
# application/dialog-info+xml
# application/dicom
# application/dns
*/"dbk":"application/docbook+xml",/*
# application/dskpp+xml
*/"dssc":"application/dssc+der",/*
*/"xdssc":"application/dssc+xml",/*
# application/dvcs
*/"ecma":"application/ecmascript",/*
# application/edi-consent
# application/edi-x12
# application/edifact
*/"emma":"application/emma+xml",/*
# application/epp+xml
*/"epub":"application/epub+zip",/*
# application/eshop
# application/example
*/"exi":"application/exi",/*
# application/fastinfoset
# application/fastsoap
# application/fits
*/"pfr":"application/font-tdpfr",/*
# application/framework-attributes+xml
*/"gml":"application/gml+xml",/*
*/"gpx":"application/gpx+xml",/*
*/"gxf":"application/gxf",/*
# application/h224
# application/held+xml
# application/http
*/"stk":"application/hyperstudio",/*
# application/ibe-key-request+xml
# application/ibe-pkg-reply+xml
# application/ibe-pp-data
# application/iges
# application/im-iscomposing+xml
# application/index
# application/index.cmd
# application/index.obj
# application/index.response
# application/index.vnd
*/"ink":"application/inkml+xml", "inkml":"application/inkml+xml",/*
# application/iotp
*/"ipfix":"application/ipfix",/*
# application/ipp
# application/isup
*/"jar":"application/java-archive",/*
*/"ser":"application/java-serialized-object",/*
*/"class":"application/java-vm",/*
*/"js":"application/javascript",/*
*/"json":"application/json",/*
*/"jsonml":"application/jsonml+json",/*
# application/kpml-request+xml
# application/kpml-response+xml
*/"lostxml":"application/lost+xml",/*
*/"hqx":"application/mac-binhex40",/*
*/"cpt":"application/mac-compactpro",/*
# application/macwriteii
*/"mads":"application/mads+xml",/*
*/"mrc":"application/marc",/*
*/"mrcx":"application/marcxml+xml",/*
*/"ma":"application/mathematica", "nb":"application/mathematica", "mb":"application/mathematica",/*
# application/mathml-content+xml
# application/mathml-presentation+xml
*/"mathml":"application/mathml+xml",/*
# application/mbms-associated-procedure-description+xml
# application/mbms-deregister+xml
# application/mbms-envelope+xml
# application/mbms-msk+xml
# application/mbms-msk-response+xml
# application/mbms-protection-description+xml
# application/mbms-reception-report+xml
# application/mbms-register+xml
# application/mbms-register-response+xml
# application/mbms-user-service-description+xml
*/"mbox":"application/mbox",/*
# application/media_control+xml
*/"mscml":"application/mediaservercontrol+xml",/*
*/"metalink":"application/metalink+xml",/*
*/"meta4":"application/metalink4+xml",/*
*/"mets":"application/mets+xml",/*
# application/mikey
*/"mods":"application/mods+xml",/*
# application/moss-keys
# application/moss-signature
# application/mosskey-data
# application/mosskey-request
*/"m21":"application/mp21", "mp21":"application/mp21",/*
*/"mp4s":"application/mp4",/*
# application/mpeg4-generic
# application/mpeg4-iod
# application/mpeg4-iod-xmt
# application/msc-ivr+xml
# application/msc-mixer+xml
*/"doc":"application/msword", "dot":"application/msword",/*
*/"mxf":"application/mxf",/*
# application/nasdata
# application/news-checkgroups
# application/news-groupinfo
# application/news-transmission
# application/nss
# application/ocsp-request
# application/ocsp-response
*/"bin":"application/octet-stream", "dms":"application/octet-stream", "lrf":"application/octet-stream", "mar":"application/octet-stream", "so":"application/octet-stream", "dist":"application/octet-stream", "distz":"application/octet-stream", "pkg":"application/octet-stream", "bpk":"application/octet-stream", "dump":"application/octet-stream", "elc":"application/octet-stream", "deploy":"application/octet-stream",/*
*/"oda":"application/oda",/*
*/"opf":"application/oebps-package+xml",/*
*/"ogx":"application/ogg",/*
*/"omdoc":"application/omdoc+xml",/*
*/"onetoc":"application/onenote", "onetoc2":"application/onenote", "onetmp":"application/onenote", "onepkg":"application/onenote",/*
*/"oxps":"application/oxps",/*
# application/parityfec
*/"xer":"application/patch-ops-error+xml",/*
*/"pdf":"application/pdf",/*
*/"pgp":"application/pgp-encrypted",/*
# application/pgp-keys
*/"asc":"application/pgp-signature", "sig":"application/pgp-signature",/*
*/"prf":"application/pics-rules",/*
# application/pidf+xml
# application/pidf-diff+xml
*/"p10":"application/pkcs10",/*
*/"p7m":"application/pkcs7-mime", "p7c":"application/pkcs7-mime",/*
*/"p7s":"application/pkcs7-signature",/*
*/"p8":"application/pkcs8",/*
*/"ac":"application/pkix-attr-cert",/*
*/"cer":"application/pkix-cert",/*
*/"crl":"application/pkix-crl",/*
*/"pkipath":"application/pkix-pkipath",/*
*/"pki":"application/pkixcmp",/*
*/"pls":"application/pls+xml",/*
# application/poc-settings+xml
*/"ai":"application/postscript", "eps":"application/postscript", "ps":"application/postscript",/*
# application/prs.alvestrand.titrax-sheet
*/"cww":"application/prs.cww",/*
# application/prs.nprend
# application/prs.plucker
# application/prs.rdf-xml-crypt
# application/prs.xsf+xml
*/"pskcxml":"application/pskc+xml",/*
# application/qsig
*/"rdf":"application/rdf+xml",/*
*/"rif":"application/reginfo+xml",/*
*/"rnc":"application/relax-ng-compact-syntax",/*
# application/remote-printing
*/"rl":"application/resource-lists+xml",/*
*/"rld":"application/resource-lists-diff+xml",/*
# application/riscos
# application/rlmi+xml
*/"rs":"application/rls-services+xml",/*
*/"gbr":"application/rpki-ghostbusters",/*
*/"mft":"application/rpki-manifest",/*
*/"roa":"application/rpki-roa",/*
# application/rpki-updown
*/"rsd":"application/rsd+xml",/*
*/"rss":"application/rss+xml",/*
*/"rtf":"application/rtf",/*
# application/rtx
# application/samlassertion+xml
# application/samlmetadata+xml
*/"sbml":"application/sbml+xml",/*
*/"scq":"application/scvp-cv-request",/*
*/"scs":"application/scvp-cv-response",/*
*/"spq":"application/scvp-vp-request",/*
*/"spp":"application/scvp-vp-response",/*
*/"sdp":"application/sdp",/*
# application/set-payment
*/"setpay":"application/set-payment-initiation",/*
# application/set-registration
*/"setreg":"application/set-registration-initiation",/*
# application/sgml
# application/sgml-open-catalog
*/"shf":"application/shf+xml",/*
# application/sieve
# application/simple-filter+xml
# application/simple-message-summary
# application/simplesymbolcontainer
# application/slate
# application/smil
*/"smi":"application/smil+xml", "smil":"application/smil+xml",/*
# application/soap+fastinfoset
# application/soap+xml
*/"rq":"application/sparql-query",/*
*/"srx":"application/sparql-results+xml",/*
# application/spirits-event+xml
*/"gram":"application/srgs",/*
*/"grxml":"application/srgs+xml",/*
*/"sru":"application/sru+xml",/*
*/"ssdl":"application/ssdl+xml",/*
*/"ssml":"application/ssml+xml",/*
# application/tamp-apex-update
# application/tamp-apex-update-confirm
# application/tamp-community-update
# application/tamp-community-update-confirm
# application/tamp-error
# application/tamp-sequence-adjust
# application/tamp-sequence-adjust-confirm
# application/tamp-status-query
# application/tamp-status-response
# application/tamp-update
# application/tamp-update-confirm
*/"tei":"application/tei+xml", "teicorpus":"application/tei+xml",/*
*/"tfi":"application/thraud+xml",/*
# application/timestamp-query
# application/timestamp-reply
*/"tsd":"application/timestamped-data",/*
# application/tve-trigger
# application/ulpfec
# application/vcard+xml
# application/vemmi
# application/vividence.scriptfile
# application/vnd.3gpp.bsf+xml
*/"plb":"application/vnd.3gpp.pic-bw-large",/*
*/"psb":"application/vnd.3gpp.pic-bw-small",/*
*/"pvb":"application/vnd.3gpp.pic-bw-var",/*
# application/vnd.3gpp.sms
# application/vnd.3gpp2.bcmcsinfo+xml
# application/vnd.3gpp2.sms
*/"tcap":"application/vnd.3gpp2.tcap",/*
*/"pwn":"application/vnd.3m.post-it-notes",/*
*/"aso":"application/vnd.accpac.simply.aso",/*
*/"imp":"application/vnd.accpac.simply.imp",/*
*/"acu":"application/vnd.acucobol",/*
*/"atc":"application/vnd.acucorp", "acutc":"application/vnd.acucorp",/*
*/"air":"application/vnd.adobe.air-application-installer-package+zip",/*
*/"fcdt":"application/vnd.adobe.formscentral.fcdt",/*
*/"fxp":"application/vnd.adobe.fxp", "fxpl":"application/vnd.adobe.fxp",/*
# application/vnd.adobe.partial-upload
*/"xdp":"application/vnd.adobe.xdp+xml",/*
*/"xfdf":"application/vnd.adobe.xfdf",/*
# application/vnd.aether.imp
# application/vnd.ah-barcode
*/"ahead":"application/vnd.ahead.space",/*
*/"azf":"application/vnd.airzip.filesecure.azf",/*
*/"azs":"application/vnd.airzip.filesecure.azs",/*
*/"azw":"application/vnd.amazon.ebook",/*
*/"acc":"application/vnd.americandynamics.acc",/*
*/"ami":"application/vnd.amiga.ami",/*
# application/vnd.amundsen.maze+xml
*/"apk":"application/vnd.android.package-archive",/*
*/"cii":"application/vnd.anser-web-certificate-issue-initiation",/*
*/"fti":"application/vnd.anser-web-funds-transfer-initiation",/*
*/"atx":"application/vnd.antix.game-component",/*
*/"mpkg":"application/vnd.apple.installer+xml",/*
*/"m3u8":"application/vnd.apple.mpegurl",/*
# application/vnd.arastra.swi
*/"swi":"application/vnd.aristanetworks.swi",/*
*/"iota":"application/vnd.astraea-software.iota",/*
*/"aep":"application/vnd.audiograph",/*
# application/vnd.autopackage
# application/vnd.avistar+xml
*/"mpm":"application/vnd.blueice.multipass",/*
# application/vnd.bluetooth.ep.oob
*/"bmi":"application/vnd.bmi",/*
*/"rep":"application/vnd.businessobjects",/*
# application/vnd.cab-jscript
# application/vnd.canon-cpdl
# application/vnd.canon-lips
# application/vnd.cendio.thinlinc.clientconf
*/"cdxml":"application/vnd.chemdraw+xml",/*
*/"mmd":"application/vnd.chipnuts.karaoke-mmd",/*
*/"cdy":"application/vnd.cinderella",/*
# application/vnd.cirpack.isdn-ext
*/"cla":"application/vnd.claymore",/*
*/"rp9":"application/vnd.cloanto.rp9",/*
*/"c4g":"application/vnd.clonk.c4group", "c4d":"application/vnd.clonk.c4group", "c4f":"application/vnd.clonk.c4group", "c4p":"application/vnd.clonk.c4group", "c4u":"application/vnd.clonk.c4group",/*
*/"c11amc":"application/vnd.cluetrust.cartomobile-config",/*
*/"c11amz":"application/vnd.cluetrust.cartomobile-config-pkg",/*
# application/vnd.collection+json
# application/vnd.commerce-battelle
*/"csp":"application/vnd.commonspace",/*
*/"cdbcmsg":"application/vnd.contact.cmsg",/*
*/"cmc":"application/vnd.cosmocaller",/*
*/"clkx":"application/vnd.crick.clicker",/*
*/"clkk":"application/vnd.crick.clicker.keyboard",/*
*/"clkp":"application/vnd.crick.clicker.palette",/*
*/"clkt":"application/vnd.crick.clicker.template",/*
*/"clkw":"application/vnd.crick.clicker.wordbank",/*
*/"wbs":"application/vnd.criticaltools.wbs+xml",/*
*/"pml":"application/vnd.ctc-posml",/*
# application/vnd.ctct.ws+xml
# application/vnd.cups-pdf
# application/vnd.cups-postscript
*/"ppd":"application/vnd.cups-ppd",/*
# application/vnd.cups-raster
# application/vnd.cups-raw
# application/vnd.curl
*/"car":"application/vnd.curl.car",/*
*/"pcurl":"application/vnd.curl.pcurl",/*
# application/vnd.cybank
*/"dart":"application/vnd.dart",/*
*/"rdz":"application/vnd.data-vision.rdz",/*
*/"uvf":"application/vnd.dece.data", "uvvf":"application/vnd.dece.data", "uvd":"application/vnd.dece.data", "uvvd":"application/vnd.dece.data",/*
*/"uvt":"application/vnd.dece.ttml+xml", "uvvt":"application/vnd.dece.ttml+xml",/*
*/"uvx":"application/vnd.dece.unspecified", "uvvx":"application/vnd.dece.unspecified",/*
*/"uvz":"application/vnd.dece.zip", "uvvz":"application/vnd.dece.zip",/*
*/"fe_launch":"application/vnd.denovo.fcselayout-link",/*
# application/vnd.dir-bi.plate-dl-nosuffix
*/"dna":"application/vnd.dna",/*
*/"mlp":"application/vnd.dolby.mlp",/*
# application/vnd.dolby.mobile.1
# application/vnd.dolby.mobile.2
*/"dpg":"application/vnd.dpgraph",/*
*/"dfac":"application/vnd.dreamfactory",/*
*/"kpxx":"application/vnd.ds-keypoint",/*
*/"ait":"application/vnd.dvb.ait",/*
# application/vnd.dvb.dvbj
# application/vnd.dvb.esgcontainer
# application/vnd.dvb.ipdcdftnotifaccess
# application/vnd.dvb.ipdcesgaccess
# application/vnd.dvb.ipdcesgaccess2
# application/vnd.dvb.ipdcesgpdd
# application/vnd.dvb.ipdcroaming
# application/vnd.dvb.iptv.alfec-base
# application/vnd.dvb.iptv.alfec-enhancement
# application/vnd.dvb.notif-aggregate-root+xml
# application/vnd.dvb.notif-container+xml
# application/vnd.dvb.notif-generic+xml
# application/vnd.dvb.notif-ia-msglist+xml
# application/vnd.dvb.notif-ia-registration-request+xml
# application/vnd.dvb.notif-ia-registration-response+xml
# application/vnd.dvb.notif-init+xml
# application/vnd.dvb.pfr
*/"svc":"application/vnd.dvb.service",/*
# application/vnd.dxr
*/"geo":"application/vnd.dynageo",/*
# application/vnd.easykaraoke.cdgdownload
# application/vnd.ecdis-update
*/"mag":"application/vnd.ecowin.chart",/*
# application/vnd.ecowin.filerequest
# application/vnd.ecowin.fileupdate
# application/vnd.ecowin.series
# application/vnd.ecowin.seriesrequest
# application/vnd.ecowin.seriesupdate
# application/vnd.emclient.accessrequest+xml
*/"nml":"application/vnd.enliven",/*
# application/vnd.eprints.data+xml
*/"esf":"application/vnd.epson.esf",/*
*/"msf":"application/vnd.epson.msf",/*
*/"qam":"application/vnd.epson.quickanime",/*
*/"slt":"application/vnd.epson.salt",/*
*/"ssf":"application/vnd.epson.ssf",/*
# application/vnd.ericsson.quickcall
*/"es3":"application/vnd.eszigno3+xml", "et3":"application/vnd.eszigno3+xml",/*
# application/vnd.etsi.aoc+xml
# application/vnd.etsi.cug+xml
# application/vnd.etsi.iptvcommand+xml
# application/vnd.etsi.iptvdiscovery+xml
# application/vnd.etsi.iptvprofile+xml
# application/vnd.etsi.iptvsad-bc+xml
# application/vnd.etsi.iptvsad-cod+xml
# application/vnd.etsi.iptvsad-npvr+xml
# application/vnd.etsi.iptvservice+xml
# application/vnd.etsi.iptvsync+xml
# application/vnd.etsi.iptvueprofile+xml
# application/vnd.etsi.mcid+xml
# application/vnd.etsi.overload-control-policy-dataset+xml
# application/vnd.etsi.sci+xml
# application/vnd.etsi.simservs+xml
# application/vnd.etsi.tsl+xml
# application/vnd.etsi.tsl.der
# application/vnd.eudora.data
*/"ez2":"application/vnd.ezpix-album",/*
*/"ez3":"application/vnd.ezpix-package",/*
# application/vnd.f-secure.mobile
*/"fdf":"application/vnd.fdf",/*
*/"mseed":"application/vnd.fdsn.mseed",/*
*/"seed":"application/vnd.fdsn.seed", "dataless":"application/vnd.fdsn.seed",/*
# application/vnd.ffsns
# application/vnd.fints
*/"gph":"application/vnd.flographit",/*
*/"ftc":"application/vnd.fluxtime.clip",/*
# application/vnd.font-fontforge-sfd
*/"fm":"application/vnd.framemaker", "frame":"application/vnd.framemaker", "maker":"application/vnd.framemaker", "book":"application/vnd.framemaker",/*
*/"fnc":"application/vnd.frogans.fnc",/*
*/"ltf":"application/vnd.frogans.ltf",/*
*/"fsc":"application/vnd.fsc.weblaunch",/*
*/"oas":"application/vnd.fujitsu.oasys",/*
*/"oa2":"application/vnd.fujitsu.oasys2",/*
*/"oa3":"application/vnd.fujitsu.oasys3",/*
*/"fg5":"application/vnd.fujitsu.oasysgp",/*
*/"bh2":"application/vnd.fujitsu.oasysprs",/*
# application/vnd.fujixerox.art-ex
# application/vnd.fujixerox.art4
# application/vnd.fujixerox.hbpl
*/"ddd":"application/vnd.fujixerox.ddd",/*
*/"xdw":"application/vnd.fujixerox.docuworks",/*
*/"xbd":"application/vnd.fujixerox.docuworks.binder",/*
# application/vnd.fut-misnet
*/"fzs":"application/vnd.fuzzysheet",/*
*/"txd":"application/vnd.genomatix.tuxedo",/*
# application/vnd.geocube+xml
*/"ggb":"application/vnd.geogebra.file",/*
*/"ggt":"application/vnd.geogebra.tool",/*
*/"gex":"application/vnd.geometry-explorer", "gre":"application/vnd.geometry-explorer",/*
*/"gxt":"application/vnd.geonext",/*
*/"g2w":"application/vnd.geoplan",/*
*/"g3w":"application/vnd.geospace",/*
# application/vnd.globalplatform.card-content-mgt
# application/vnd.globalplatform.card-content-mgt-response
*/"gmx":"application/vnd.gmx",/*
*/"kml":"application/vnd.google-earth.kml+xml",/*
*/"kmz":"application/vnd.google-earth.kmz",/*
*/"gqf":"application/vnd.grafeq", "gqs":"application/vnd.grafeq",/*
# application/vnd.gridmp
*/"gac":"application/vnd.groove-account",/*
*/"ghf":"application/vnd.groove-help",/*
*/"gim":"application/vnd.groove-identity-message",/*
*/"grv":"application/vnd.groove-injector",/*
*/"gtm":"application/vnd.groove-tool-message",/*
*/"tpl":"application/vnd.groove-tool-template",/*
*/"vcg":"application/vnd.groove-vcard",/*
# application/vnd.hal+json
*/"hal":"application/vnd.hal+xml",/*
*/"zmm":"application/vnd.handheld-entertainment+xml",/*
*/"hbci":"application/vnd.hbci",/*
# application/vnd.hcl-bireports
*/"les":"application/vnd.hhe.lesson-player",/*
*/"hpgl":"application/vnd.hp-hpgl",/*
*/"hpid":"application/vnd.hp-hpid",/*
*/"hps":"application/vnd.hp-hps",/*
*/"jlt":"application/vnd.hp-jlyt",/*
*/"pcl":"application/vnd.hp-pcl",/*
*/"pclxl":"application/vnd.hp-pclxl",/*
# application/vnd.httphone
*/"sfd-hdstx":"application/vnd.hydrostatix.sof-data",/*
# application/vnd.hzn-3d-crossword
# application/vnd.ibm.afplinedata
# application/vnd.ibm.electronic-media
*/"mpy":"application/vnd.ibm.minipay",/*
*/"afp":"application/vnd.ibm.modcap", "listafp":"application/vnd.ibm.modcap", "list3820":"application/vnd.ibm.modcap",/*
*/"irm":"application/vnd.ibm.rights-management",/*
*/"sc":"application/vnd.ibm.secure-container",/*
*/"icc":"application/vnd.iccprofile", "icm":"application/vnd.iccprofile",/*
*/"igl":"application/vnd.igloader",/*
*/"ivp":"application/vnd.immervision-ivp",/*
*/"ivu":"application/vnd.immervision-ivu",/*
# application/vnd.informedcontrol.rms+xml
# application/vnd.informix-visionary
# application/vnd.infotech.project
# application/vnd.infotech.project+xml
# application/vnd.innopath.wamp.notification
*/"igm":"application/vnd.insors.igm",/*
*/"xpw":"application/vnd.intercon.formnet", "xpx":"application/vnd.intercon.formnet",/*
*/"i2g":"application/vnd.intergeo",/*
# application/vnd.intertrust.digibox
# application/vnd.intertrust.nncp
*/"qbo":"application/vnd.intu.qbo",/*
*/"qfx":"application/vnd.intu.qfx",/*
# application/vnd.iptc.g2.conceptitem+xml
# application/vnd.iptc.g2.knowledgeitem+xml
# application/vnd.iptc.g2.newsitem+xml
# application/vnd.iptc.g2.newsmessage+xml
# application/vnd.iptc.g2.packageitem+xml
# application/vnd.iptc.g2.planningitem+xml
*/"rcprofile":"application/vnd.ipunplugged.rcprofile",/*
*/"irp":"application/vnd.irepository.package+xml",/*
*/"xpr":"application/vnd.is-xpr",/*
*/"fcs":"application/vnd.isac.fcs",/*
*/"jam":"application/vnd.jam",/*
# application/vnd.japannet-directory-service
# application/vnd.japannet-jpnstore-wakeup
# application/vnd.japannet-payment-wakeup
# application/vnd.japannet-registration
# application/vnd.japannet-registration-wakeup
# application/vnd.japannet-setstore-wakeup
# application/vnd.japannet-verification
# application/vnd.japannet-verification-wakeup
*/"rms":"application/vnd.jcp.javame.midlet-rms",/*
*/"jisp":"application/vnd.jisp",/*
*/"joda":"application/vnd.joost.joda-archive",/*
*/"ktz":"application/vnd.kahootz", "ktr":"application/vnd.kahootz",/*
*/"karbon":"application/vnd.kde.karbon",/*
*/"chrt":"application/vnd.kde.kchart",/*
*/"kfo":"application/vnd.kde.kformula",/*
*/"flw":"application/vnd.kde.kivio",/*
*/"kon":"application/vnd.kde.kontour",/*
*/"kpr":"application/vnd.kde.kpresenter", "kpt":"application/vnd.kde.kpresenter",/*
*/"ksp":"application/vnd.kde.kspread",/*
*/"kwd":"application/vnd.kde.kword", "kwt":"application/vnd.kde.kword",/*
*/"htke":"application/vnd.kenameaapp",/*
*/"kia":"application/vnd.kidspiration",/*
*/"kne":"application/vnd.kinar", "knp":"application/vnd.kinar",/*
*/"skp":"application/vnd.koan", "skd":"application/vnd.koan", "skt":"application/vnd.koan", "skm":"application/vnd.koan",/*
*/"sse":"application/vnd.kodak-descriptor",/*
*/"lasxml":"application/vnd.las.las+xml",/*
# application/vnd.liberty-request+xml
*/"lbd":"application/vnd.llamagraphics.life-balance.desktop",/*
*/"lbe":"application/vnd.llamagraphics.life-balance.exchange+xml",/*
*/"123":"application/vnd.lotus-1-2-3",/*
*/"apr":"application/vnd.lotus-approach",/*
*/"pre":"application/vnd.lotus-freelance",/*
*/"nsf":"application/vnd.lotus-notes",/*
*/"org":"application/vnd.lotus-organizer",/*
*/"scm":"application/vnd.lotus-screencam",/*
*/"lwp":"application/vnd.lotus-wordpro",/*
*/"portpkg":"application/vnd.macports.portpkg",/*
# application/vnd.marlin.drm.actiontoken+xml
# application/vnd.marlin.drm.conftoken+xml
# application/vnd.marlin.drm.license+xml
# application/vnd.marlin.drm.mdcf
*/"mcd":"application/vnd.mcd",/*
*/"mc1":"application/vnd.medcalcdata",/*
*/"cdkey":"application/vnd.mediastation.cdkey",/*
# application/vnd.meridian-slingshot
*/"mwf":"application/vnd.mfer",/*
*/"mfm":"application/vnd.mfmp",/*
*/"flo":"application/vnd.micrografx.flo",/*
*/"igx":"application/vnd.micrografx.igx",/*
*/"mif":"application/vnd.mif",/*
# application/vnd.minisoft-hp3000-save
# application/vnd.mitsubishi.misty-guard.trustweb
*/"daf":"application/vnd.mobius.daf",/*
*/"dis":"application/vnd.mobius.dis",/*
*/"mbk":"application/vnd.mobius.mbk",/*
*/"mqy":"application/vnd.mobius.mqy",/*
*/"msl":"application/vnd.mobius.msl",/*
*/"plc":"application/vnd.mobius.plc",/*
*/"txf":"application/vnd.mobius.txf",/*
*/"mpn":"application/vnd.mophun.application",/*
*/"mpc":"application/vnd.mophun.certificate",/*
# application/vnd.motorola.flexsuite
# application/vnd.motorola.flexsuite.adsi
# application/vnd.motorola.flexsuite.fis
# application/vnd.motorola.flexsuite.gotap
# application/vnd.motorola.flexsuite.kmr
# application/vnd.motorola.flexsuite.ttc
# application/vnd.motorola.flexsuite.wem
# application/vnd.motorola.iprm
*/"xul":"application/vnd.mozilla.xul+xml",/*
*/"cil":"application/vnd.ms-artgalry",/*
# application/vnd.ms-asf
*/"cab":"application/vnd.ms-cab-compressed",/*
# application/vnd.ms-color.iccprofile
*/"xls":"application/vnd.ms-excel", "xlm":"application/vnd.ms-excel", "xla":"application/vnd.ms-excel", "xlc":"application/vnd.ms-excel", "xlt":"application/vnd.ms-excel", "xlw":"application/vnd.ms-excel",/*
*/"xlam":"application/vnd.ms-excel.addin.macroenabled.12",/*
*/"xlsb":"application/vnd.ms-excel.sheet.binary.macroenabled.12",/*
*/"xlsm":"application/vnd.ms-excel.sheet.macroenabled.12",/*
*/"xltm":"application/vnd.ms-excel.template.macroenabled.12",/*
*/"eot":"application/vnd.ms-fontobject",/*
*/"chm":"application/vnd.ms-htmlhelp",/*
*/"ims":"application/vnd.ms-ims",/*
*/"lrm":"application/vnd.ms-lrm",/*
# application/vnd.ms-office.activex+xml
*/"thmx":"application/vnd.ms-officetheme",/*
# application/vnd.ms-opentype
# application/vnd.ms-package.obfuscated-opentype
*/"cat":"application/vnd.ms-pki.seccat",/*
*/"stl":"application/vnd.ms-pki.stl",/*
# application/vnd.ms-playready.initiator+xml
*/"ppt":"application/vnd.ms-powerpoint", "pps":"application/vnd.ms-powerpoint", "pot":"application/vnd.ms-powerpoint",/*
*/"ppam":"application/vnd.ms-powerpoint.addin.macroenabled.12",/*
*/"pptm":"application/vnd.ms-powerpoint.presentation.macroenabled.12",/*
*/"sldm":"application/vnd.ms-powerpoint.slide.macroenabled.12",/*
*/"ppsm":"application/vnd.ms-powerpoint.slideshow.macroenabled.12",/*
*/"potm":"application/vnd.ms-powerpoint.template.macroenabled.12",/*
# application/vnd.ms-printing.printticket+xml
*/"mpp":"application/vnd.ms-project", "mpt":"application/vnd.ms-project",/*
# application/vnd.ms-tnef
# application/vnd.ms-wmdrm.lic-chlg-req
# application/vnd.ms-wmdrm.lic-resp
# application/vnd.ms-wmdrm.meter-chlg-req
# application/vnd.ms-wmdrm.meter-resp
*/"docm":"application/vnd.ms-word.document.macroenabled.12",/*
*/"dotm":"application/vnd.ms-word.template.macroenabled.12",/*
*/"wps":"application/vnd.ms-works", "wks":"application/vnd.ms-works", "wcm":"application/vnd.ms-works", "wdb":"application/vnd.ms-works",/*
*/"wpl":"application/vnd.ms-wpl",/*
*/"xps":"application/vnd.ms-xpsdocument",/*
*/"mseq":"application/vnd.mseq",/*
# application/vnd.msign
# application/vnd.multiad.creator
# application/vnd.multiad.creator.cif
# application/vnd.music-niff
*/"mus":"application/vnd.musician",/*
*/"msty":"application/vnd.muvee.style",/*
*/"taglet":"application/vnd.mynfc",/*
# application/vnd.ncd.control
# application/vnd.ncd.reference
# application/vnd.nervana
# application/vnd.netfpx
*/"nlu":"application/vnd.neurolanguage.nlu",/*
*/"ntf":"application/vnd.nitf", "nitf":"application/vnd.nitf",/*
*/"nnd":"application/vnd.noblenet-directory",/*
*/"nns":"application/vnd.noblenet-sealer",/*
*/"nnw":"application/vnd.noblenet-web",/*
# application/vnd.nokia.catalogs
# application/vnd.nokia.conml+wbxml
# application/vnd.nokia.conml+xml
# application/vnd.nokia.isds-radio-presets
# application/vnd.nokia.iptv.config+xml
# application/vnd.nokia.landmark+wbxml
# application/vnd.nokia.landmark+xml
# application/vnd.nokia.landmarkcollection+xml
# application/vnd.nokia.n-gage.ac+xml
*/"ngdat":"application/vnd.nokia.n-gage.data",/*
*/"n-gage":"application/vnd.nokia.n-gage.symbian.install",/*
# application/vnd.nokia.ncd
# application/vnd.nokia.pcd+wbxml
# application/vnd.nokia.pcd+xml
*/"rpst":"application/vnd.nokia.radio-preset",/*
*/"rpss":"application/vnd.nokia.radio-presets",/*
*/"edm":"application/vnd.novadigm.edm",/*
*/"edx":"application/vnd.novadigm.edx",/*
*/"ext":"application/vnd.novadigm.ext",/*
# application/vnd.ntt-local.file-transfer
# application/vnd.ntt-local.sip-ta_remote
# application/vnd.ntt-local.sip-ta_tcp_stream
*/"odc":"application/vnd.oasis.opendocument.chart",/*
*/"otc":"application/vnd.oasis.opendocument.chart-template",/*
*/"odb":"application/vnd.oasis.opendocument.database",/*
*/"odf":"application/vnd.oasis.opendocument.formula",/*
*/"odft":"application/vnd.oasis.opendocument.formula-template",/*
*/"odg":"application/vnd.oasis.opendocument.graphics",/*
*/"otg":"application/vnd.oasis.opendocument.graphics-template",/*
*/"odi":"application/vnd.oasis.opendocument.image",/*
*/"oti":"application/vnd.oasis.opendocument.image-template",/*
*/"odp":"application/vnd.oasis.opendocument.presentation",/*
*/"otp":"application/vnd.oasis.opendocument.presentation-template",/*
*/"ods":"application/vnd.oasis.opendocument.spreadsheet",/*
*/"ots":"application/vnd.oasis.opendocument.spreadsheet-template",/*
*/"odt":"application/vnd.oasis.opendocument.text",/*
*/"odm":"application/vnd.oasis.opendocument.text-master",/*
*/"ott":"application/vnd.oasis.opendocument.text-template",/*
*/"oth":"application/vnd.oasis.opendocument.text-web",/*
# application/vnd.obn
# application/vnd.oftn.l10n+json
# application/vnd.oipf.contentaccessdownload+xml
# application/vnd.oipf.contentaccessstreaming+xml
# application/vnd.oipf.cspg-hexbinary
# application/vnd.oipf.dae.svg+xml
# application/vnd.oipf.dae.xhtml+xml
# application/vnd.oipf.mippvcontrolmessage+xml
# application/vnd.oipf.pae.gem
# application/vnd.oipf.spdiscovery+xml
# application/vnd.oipf.spdlist+xml
# application/vnd.oipf.ueprofile+xml
# application/vnd.oipf.userprofile+xml
*/"xo":"application/vnd.olpc-sugar",/*
# application/vnd.oma-scws-config
# application/vnd.oma-scws-http-request
# application/vnd.oma-scws-http-response
# application/vnd.oma.bcast.associated-procedure-parameter+xml
# application/vnd.oma.bcast.drm-trigger+xml
# application/vnd.oma.bcast.imd+xml
# application/vnd.oma.bcast.ltkm
# application/vnd.oma.bcast.notification+xml
# application/vnd.oma.bcast.provisioningtrigger
# application/vnd.oma.bcast.sgboot
# application/vnd.oma.bcast.sgdd+xml
# application/vnd.oma.bcast.sgdu
# application/vnd.oma.bcast.simple-symbol-container
# application/vnd.oma.bcast.smartcard-trigger+xml
# application/vnd.oma.bcast.sprov+xml
# application/vnd.oma.bcast.stkm
# application/vnd.oma.cab-address-book+xml
# application/vnd.oma.cab-feature-handler+xml
# application/vnd.oma.cab-pcc+xml
# application/vnd.oma.cab-user-prefs+xml
# application/vnd.oma.dcd
# application/vnd.oma.dcdc
*/"dd2":"application/vnd.oma.dd2+xml",/*
# application/vnd.oma.drm.risd+xml
# application/vnd.oma.group-usage-list+xml
# application/vnd.oma.pal+xml
# application/vnd.oma.poc.detailed-progress-report+xml
# application/vnd.oma.poc.final-report+xml
# application/vnd.oma.poc.groups+xml
# application/vnd.oma.poc.invocation-descriptor+xml
# application/vnd.oma.poc.optimized-progress-report+xml
# application/vnd.oma.push
# application/vnd.oma.scidm.messages+xml
# application/vnd.oma.xcap-directory+xml
# application/vnd.omads-email+xml
# application/vnd.omads-file+xml
# application/vnd.omads-folder+xml
# application/vnd.omaloc-supl-init
*/"oxt":"application/vnd.openofficeorg.extension",/*
# application/vnd.openxmlformats-officedocument.custom-properties+xml
# application/vnd.openxmlformats-officedocument.customxmlproperties+xml
# application/vnd.openxmlformats-officedocument.drawing+xml
# application/vnd.openxmlformats-officedocument.drawingml.chart+xml
# application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml
# application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml
# application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml
# application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml
# application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml
# application/vnd.openxmlformats-officedocument.extended-properties+xml
# application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml
# application/vnd.openxmlformats-officedocument.presentationml.comments+xml
# application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml
# application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml
# application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml
*/"pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation",/*
# application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml
# application/vnd.openxmlformats-officedocument.presentationml.presprops+xml
*/"sldx":"application/vnd.openxmlformats-officedocument.presentationml.slide",/*
# application/vnd.openxmlformats-officedocument.presentationml.slide+xml
# application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml
# application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml
*/"ppsx":"application/vnd.openxmlformats-officedocument.presentationml.slideshow",/*
# application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml
# application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml
# application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml
# application/vnd.openxmlformats-officedocument.presentationml.tags+xml
*/"potx":"application/vnd.openxmlformats-officedocument.presentationml.template",/*
# application/vnd.openxmlformats-officedocument.presentationml.template.main+xml
# application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml
*/"xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",/*
# application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml
*/"xltx":"application/vnd.openxmlformats-officedocument.spreadsheetml.template",/*
# application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml
# application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml
# application/vnd.openxmlformats-officedocument.theme+xml
# application/vnd.openxmlformats-officedocument.themeoverride+xml
# application/vnd.openxmlformats-officedocument.vmldrawing
# application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml
*/"docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",/*
# application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml
# application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml
# application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml
# application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml
# application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml
# application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml
# application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml
# application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml
# application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml
*/"dotx":"application/vnd.openxmlformats-officedocument.wordprocessingml.template",/*
# application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml
# application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml
# application/vnd.openxmlformats-package.core-properties+xml
# application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml
# application/vnd.openxmlformats-package.relationships+xml
# application/vnd.quobject-quoxdocument
# application/vnd.osa.netdeploy
*/"mgp":"application/vnd.osgeo.mapguide.package",/*
# application/vnd.osgi.bundle
*/"dp":"application/vnd.osgi.dp",/*
*/"esa":"application/vnd.osgi.subsystem",/*
# application/vnd.otps.ct-kip+xml
*/"pdb":"application/vnd.palm", "pqa":"application/vnd.palm", "oprc":"application/vnd.palm",/*
# application/vnd.paos.xml
*/"paw":"application/vnd.pawaafile",/*
*/"str":"application/vnd.pg.format",/*
*/"ei6":"application/vnd.pg.osasli",/*
# application/vnd.piaccess.application-licence
*/"efif":"application/vnd.picsel",/*
*/"wg":"application/vnd.pmi.widget",/*
# application/vnd.poc.group-advertisement+xml
*/"plf":"application/vnd.pocketlearn",/*
*/"pbd":"application/vnd.powerbuilder6",/*
# application/vnd.powerbuilder6-s
# application/vnd.powerbuilder7
# application/vnd.powerbuilder7-s
# application/vnd.powerbuilder75
# application/vnd.powerbuilder75-s
# application/vnd.preminet
*/"box":"application/vnd.previewsystems.box",/*
*/"mgz":"application/vnd.proteus.magazine",/*
*/"qps":"application/vnd.publishare-delta-tree",/*
*/"ptid":"application/vnd.pvi.ptid1",/*
# application/vnd.pwg-multiplexed
# application/vnd.pwg-xhtml-print+xml
# application/vnd.qualcomm.brew-app-res
*/"qxd":"application/vnd.quark.quarkxpress", "qxt":"application/vnd.quark.quarkxpress", "qwd":"application/vnd.quark.quarkxpress", "qwt":"application/vnd.quark.quarkxpress", "qxl":"application/vnd.quark.quarkxpress", "qxb":"application/vnd.quark.quarkxpress",/*
# application/vnd.radisys.moml+xml
# application/vnd.radisys.msml+xml
# application/vnd.radisys.msml-audit+xml
# application/vnd.radisys.msml-audit-conf+xml
# application/vnd.radisys.msml-audit-conn+xml
# application/vnd.radisys.msml-audit-dialog+xml
# application/vnd.radisys.msml-audit-stream+xml
# application/vnd.radisys.msml-conf+xml
# application/vnd.radisys.msml-dialog+xml
# application/vnd.radisys.msml-dialog-base+xml
# application/vnd.radisys.msml-dialog-fax-detect+xml
# application/vnd.radisys.msml-dialog-fax-sendrecv+xml
# application/vnd.radisys.msml-dialog-group+xml
# application/vnd.radisys.msml-dialog-speech+xml
# application/vnd.radisys.msml-dialog-transform+xml
# application/vnd.rainstor.data
# application/vnd.rapid
*/"bed":"application/vnd.realvnc.bed",/*
*/"mxl":"application/vnd.recordare.musicxml",/*
*/"musicxml":"application/vnd.recordare.musicxml+xml",/*
# application/vnd.renlearn.rlprint
*/"cryptonote":"application/vnd.rig.cryptonote",/*
*/"cod":"application/vnd.rim.cod",/*
*/"rm":"application/vnd.rn-realmedia",/*
*/"rmvb":"application/vnd.rn-realmedia-vbr",/*
*/"link66":"application/vnd.route66.link66+xml",/*
# application/vnd.rs-274x
# application/vnd.ruckus.download
# application/vnd.s3sms
*/"st":"application/vnd.sailingtracker.track",/*
# application/vnd.sbm.cid
# application/vnd.sbm.mid2
# application/vnd.scribus
# application/vnd.sealed.3df
# application/vnd.sealed.csf
# application/vnd.sealed.doc
# application/vnd.sealed.eml
# application/vnd.sealed.mht
# application/vnd.sealed.net
# application/vnd.sealed.ppt
# application/vnd.sealed.tiff
# application/vnd.sealed.xls
# application/vnd.sealedmedia.softseal.html
# application/vnd.sealedmedia.softseal.pdf
*/"see":"application/vnd.seemail",/*
*/"sema":"application/vnd.sema",/*
*/"semd":"application/vnd.semd",/*
*/"semf":"application/vnd.semf",/*
*/"ifm":"application/vnd.shana.informed.formdata",/*
*/"itp":"application/vnd.shana.informed.formtemplate",/*
*/"iif":"application/vnd.shana.informed.interchange",/*
*/"ipk":"application/vnd.shana.informed.package",/*
*/"twd":"application/vnd.simtech-mindmapper", "twds":"application/vnd.simtech-mindmapper",/*
*/"mmf":"application/vnd.smaf",/*
# application/vnd.smart.notebook
*/"teacher":"application/vnd.smart.teacher",/*
# application/vnd.software602.filler.form+xml
# application/vnd.software602.filler.form-xml-zip
*/"sdkm":"application/vnd.solent.sdkm+xml", "sdkd":"application/vnd.solent.sdkm+xml",/*
*/"dxp":"application/vnd.spotfire.dxp",/*
*/"sfs":"application/vnd.spotfire.sfs",/*
# application/vnd.sss-cod
# application/vnd.sss-dtf
# application/vnd.sss-ntf
*/"sdc":"application/vnd.stardivision.calc",/*
*/"sda":"application/vnd.stardivision.draw",/*
*/"sdd":"application/vnd.stardivision.impress",/*
*/"smf":"application/vnd.stardivision.math",/*
*/"sdw":"application/vnd.stardivision.writer", "vor":"application/vnd.stardivision.writer",/*
*/"sgl":"application/vnd.stardivision.writer-global",/*
*/"smzip":"application/vnd.stepmania.package",/*
*/"sm":"application/vnd.stepmania.stepchart",/*
# application/vnd.street-stream
*/"sxc":"application/vnd.sun.xml.calc",/*
*/"stc":"application/vnd.sun.xml.calc.template",/*
*/"sxd":"application/vnd.sun.xml.draw",/*
*/"std":"application/vnd.sun.xml.draw.template",/*
*/"sxi":"application/vnd.sun.xml.impress",/*
*/"sti":"application/vnd.sun.xml.impress.template",/*
*/"sxm":"application/vnd.sun.xml.math",/*
*/"sxw":"application/vnd.sun.xml.writer",/*
*/"sxg":"application/vnd.sun.xml.writer.global",/*
*/"stw":"application/vnd.sun.xml.writer.template",/*
# application/vnd.sun.wadl+xml
*/"sus":"application/vnd.sus-calendar", "susp":"application/vnd.sus-calendar",/*
*/"svd":"application/vnd.svd",/*
# application/vnd.swiftview-ics
*/"sis":"application/vnd.symbian.install", "sisx":"application/vnd.symbian.install",/*
*/"xsm":"application/vnd.syncml+xml",/*
*/"bdm":"application/vnd.syncml.dm+wbxml",/*
*/"xdm":"application/vnd.syncml.dm+xml",/*
# application/vnd.syncml.dm.notification
# application/vnd.syncml.ds.notification
*/"tao":"application/vnd.tao.intent-module-archive",/*
*/"pcap":"application/vnd.tcpdump.pcap", "cap":"application/vnd.tcpdump.pcap", "dmp":"application/vnd.tcpdump.pcap",/*
*/"tmo":"application/vnd.tmobile-livetv",/*
*/"tpt":"application/vnd.trid.tpt",/*
*/"mxs":"application/vnd.triscape.mxs",/*
*/"tra":"application/vnd.trueapp",/*
# application/vnd.truedoc
# application/vnd.ubisoft.webplayer
*/"ufd":"application/vnd.ufdl", "ufdl":"application/vnd.ufdl",/*
*/"utz":"application/vnd.uiq.theme",/*
*/"umj":"application/vnd.umajin",/*
*/"unityweb":"application/vnd.unity",/*
*/"uoml":"application/vnd.uoml+xml",/*
# application/vnd.uplanet.alert
# application/vnd.uplanet.alert-wbxml
# application/vnd.uplanet.bearer-choice
# application/vnd.uplanet.bearer-choice-wbxml
# application/vnd.uplanet.cacheop
# application/vnd.uplanet.cacheop-wbxml
# application/vnd.uplanet.channel
# application/vnd.uplanet.channel-wbxml
# application/vnd.uplanet.list
# application/vnd.uplanet.list-wbxml
# application/vnd.uplanet.listcmd
# application/vnd.uplanet.listcmd-wbxml
# application/vnd.uplanet.signal
*/"vcx":"application/vnd.vcx",/*
# application/vnd.vd-study
# application/vnd.vectorworks
# application/vnd.verimatrix.vcas
# application/vnd.vidsoft.vidconference
*/"vsd":"application/vnd.visio", "vst":"application/vnd.visio", "vss":"application/vnd.visio", "vsw":"application/vnd.visio",/*
*/"vis":"application/vnd.visionary",/*
# application/vnd.vividence.scriptfile
*/"vsf":"application/vnd.vsf",/*
# application/vnd.wap.sic
# application/vnd.wap.slc
*/"wbxml":"application/vnd.wap.wbxml",/*
*/"wmlc":"application/vnd.wap.wmlc",/*
*/"wmlsc":"application/vnd.wap.wmlscriptc",/*
*/"wtb":"application/vnd.webturbo",/*
# application/vnd.wfa.wsc
# application/vnd.wmc
# application/vnd.wmf.bootstrap
# application/vnd.wolfram.mathematica
# application/vnd.wolfram.mathematica.package
*/"nbp":"application/vnd.wolfram.player",/*
*/"wpd":"application/vnd.wordperfect",/*
*/"wqd":"application/vnd.wqd",/*
# application/vnd.wrq-hp3000-labelled
*/"stf":"application/vnd.wt.stf",/*
# application/vnd.wv.csp+wbxml
# application/vnd.wv.csp+xml
# application/vnd.wv.ssp+xml
*/"xar":"application/vnd.xara",/*
*/"xfdl":"application/vnd.xfdl",/*
# application/vnd.xfdl.webform
# application/vnd.xmi+xml
# application/vnd.xmpie.cpkg
# application/vnd.xmpie.dpkg
# application/vnd.xmpie.plan
# application/vnd.xmpie.ppkg
# application/vnd.xmpie.xlim
*/"hvd":"application/vnd.yamaha.hv-dic",/*
*/"hvs":"application/vnd.yamaha.hv-script",/*
*/"hvp":"application/vnd.yamaha.hv-voice",/*
*/"osf":"application/vnd.yamaha.openscoreformat",/*
*/"osfpvg":"application/vnd.yamaha.openscoreformat.osfpvg+xml",/*
# application/vnd.yamaha.remote-setup
*/"saf":"application/vnd.yamaha.smaf-audio",/*
*/"spf":"application/vnd.yamaha.smaf-phrase",/*
# application/vnd.yamaha.through-ngn
# application/vnd.yamaha.tunnel-udpencap
*/"cmp":"application/vnd.yellowriver-custom-menu",/*
*/"zir":"application/vnd.zul", "zirz":"application/vnd.zul",/*
*/"zaz":"application/vnd.zzazz.deck+xml",/*
*/"vxml":"application/voicexml+xml",/*
# application/vq-rtcpxr
# application/watcherinfo+xml
# application/whoispp-query
# application/whoispp-response
*/"wgt":"application/widget",/*
*/"hlp":"application/winhlp",/*
# application/wita
# application/wordperfect5.1
*/"wsdl":"application/wsdl+xml",/*
*/"wspolicy":"application/wspolicy+xml",/*
*/"7z":"application/x-7z-compressed",/*
*/"abw":"application/x-abiword",/*
*/"ace":"application/x-ace-compressed",/*
# application/x-amf
*/"dmg":"application/x-apple-diskimage",/*
*/"aab":"application/x-authorware-bin", "x32":"application/x-authorware-bin", "u32":"application/x-authorware-bin", "vox":"application/x-authorware-bin",/*
*/"aam":"application/x-authorware-map",/*
*/"aas":"application/x-authorware-seg",/*
*/"bcpio":"application/x-bcpio",/*
*/"torrent":"application/x-bittorrent",/*
*/"blb":"application/x-blorb", "blorb":"application/x-blorb",/*
*/"bz":"application/x-bzip",/*
*/"bz2":"application/x-bzip2", "boz":"application/x-bzip2",/*
*/"cbr":"application/x-cbr", "cba":"application/x-cbr", "cbt":"application/x-cbr", "cbz":"application/x-cbr", "cb7":"application/x-cbr",/*
*/"vcd":"application/x-cdlink",/*
*/"cfs":"application/x-cfs-compressed",/*
*/"chat":"application/x-chat",/*
*/"pgn":"application/x-chess-pgn",/*
*/"nsc":"application/x-conference",/*
# application/x-compress
*/"cpio":"application/x-cpio",/*
*/"csh":"application/x-csh",/*
*/"deb":"application/x-debian-package", "udeb":"application/x-debian-package",/*
*/"dgc":"application/x-dgc-compressed",/*
*/"dir":"application/x-director", "dcr":"application/x-director", "dxr":"application/x-director", "cst":"application/x-director", "cct":"application/x-director", "cxt":"application/x-director", "w3d":"application/x-director", "fgd":"application/x-director", "swa":"application/x-director",/*
*/"wad":"application/x-doom",/*
*/"ncx":"application/x-dtbncx+xml",/*
*/"dtb":"application/x-dtbook+xml",/*
*/"res":"application/x-dtbresource+xml",/*
*/"dvi":"application/x-dvi",/*
*/"evy":"application/x-envoy",/*
*/"eva":"application/x-eva",/*
*/"bdf":"application/x-font-bdf",/*
# application/x-font-dos
# application/x-font-framemaker
*/"gsf":"application/x-font-ghostscript",/*
# application/x-font-libgrx
*/"psf":"application/x-font-linux-psf",/*
*/"otf":"application/x-font-otf",/*
*/"pcf":"application/x-font-pcf",/*
*/"snf":"application/x-font-snf",/*
# application/x-font-speedo
# application/x-font-sunos-news
*/"ttf":"application/x-font-ttf", "ttc":"application/x-font-ttf",/*
*/"pfa":"application/x-font-type1", "pfb":"application/x-font-type1", "pfm":"application/x-font-type1", "afm":"application/x-font-type1",/*
*/"woff":"application/font-woff",/*
# application/x-font-vfont
*/"arc":"application/x-freearc",/*
*/"spl":"application/x-futuresplash",/*
*/"gca":"application/x-gca-compressed",/*
*/"ulx":"application/x-glulx",/*
*/"gnumeric":"application/x-gnumeric",/*
*/"gramps":"application/x-gramps-xml",/*
*/"gtar":"application/x-gtar",/*
# application/x-gzip
*/"hdf":"application/x-hdf",/*
*/"install":"application/x-install-instructions",/*
*/"iso":"application/x-iso9660-image",/*
*/"jnlp":"application/x-java-jnlp-file",/*
*/"latex":"application/x-latex",/*
*/"lzh":"application/x-lzh-compressed", "lha":"application/x-lzh-compressed",/*
*/"mie":"application/x-mie",/*
*/"prc":"application/x-mobipocket-ebook", "mobi":"application/x-mobipocket-ebook",/*
*/"application":"application/x-ms-application",/*
*/"lnk":"application/x-ms-shortcut",/*
*/"wmd":"application/x-ms-wmd",/*
*/"wmz":"application/x-ms-wmz",/*
*/"xbap":"application/x-ms-xbap",/*
*/"mdb":"application/x-msaccess",/*
*/"obd":"application/x-msbinder",/*
*/"crd":"application/x-mscardfile",/*
*/"clp":"application/x-msclip",/*
*/"exe":"application/x-msdownload", "dll":"application/x-msdownload", "com":"application/x-msdownload", "bat":"application/x-msdownload", "msi":"application/x-msdownload",/*
*/"mvb":"application/x-msmediaview", "m13":"application/x-msmediaview", "m14":"application/x-msmediaview",/*
*/"wmf":"application/x-msmetafile", "wmz":"application/x-msmetafile", "emf":"application/x-msmetafile", "emz":"application/x-msmetafile",/*
*/"mny":"application/x-msmoney",/*
*/"pub":"application/x-mspublisher",/*
*/"scd":"application/x-msschedule",/*
*/"trm":"application/x-msterminal",/*
*/"wri":"application/x-mswrite",/*
*/"nc":"application/x-netcdf", "cdf":"application/x-netcdf",/*
*/"nzb":"application/x-nzb",/*
*/"p12":"application/x-pkcs12", "pfx":"application/x-pkcs12",/*
*/"p7b":"application/x-pkcs7-certificates", "spc":"application/x-pkcs7-certificates",/*
*/"p7r":"application/x-pkcs7-certreqresp",/*
*/"rar":"application/x-rar-compressed",/*
*/"ris":"application/x-research-info-systems",/*
*/"sh":"application/x-sh",/*
*/"shar":"application/x-shar",/*
*/"swf":"application/x-shockwave-flash",/*
*/"xap":"application/x-silverlight-app",/*
*/"sql":"application/x-sql",/*
*/"sit":"application/x-stuffit",/*
*/"sitx":"application/x-stuffitx",/*
*/"srt":"application/x-subrip",/*
*/"sv4cpio":"application/x-sv4cpio",/*
*/"sv4crc":"application/x-sv4crc",/*
*/"t3":"application/x-t3vm-image",/*
*/"gam":"application/x-tads",/*
*/"tar":"application/x-tar",/*
*/"tcl":"application/x-tcl",/*
*/"tex":"application/x-tex",/*
*/"tfm":"application/x-tex-tfm",/*
*/"texinfo":"application/x-texinfo", "texi":"application/x-texinfo",/*
*/"obj":"application/x-tgif",/*
*/"ustar":"application/x-ustar",/*
*/"src":"application/x-wais-source",/*
*/"der":"application/x-x509-ca-cert", "crt":"application/x-x509-ca-cert",/*
*/"fig":"application/x-xfig",/*
*/"xlf":"application/x-xliff+xml",/*
*/"xpi":"application/x-xpinstall",/*
*/"xz":"application/x-xz",/*
*/"z1":"application/x-zmachine", "z2":"application/x-zmachine", "z3":"application/x-zmachine", "z4":"application/x-zmachine", "z5":"application/x-zmachine", "z6":"application/x-zmachine", "z7":"application/x-zmachine", "z8":"application/x-zmachine",/*
# application/x400-bp
*/"xaml":"application/xaml+xml",/*
# application/xcap-att+xml
# application/xcap-caps+xml
*/"xdf":"application/xcap-diff+xml",/*
# application/xcap-el+xml
# application/xcap-error+xml
# application/xcap-ns+xml
# application/xcon-conference-info-diff+xml
# application/xcon-conference-info+xml
*/"xenc":"application/xenc+xml",/*
*/"xhtml":"application/xhtml+xml", "xht":"application/xhtml+xml",/*
# application/xhtml-voice+xml
*/"xml":"application/xml", "xsl":"application/xml",/*
*/"dtd":"application/xml-dtd",/*
# application/xml-external-parsed-entity
# application/xmpp+xml
*/"xop":"application/xop+xml",/*
*/"xpl":"application/xproc+xml",/*
*/"xslt":"application/xslt+xml",/*
*/"xspf":"application/xspf+xml",/*
*/"mxml":"application/xv+xml", "xhvml":"application/xv+xml", "xvml":"application/xv+xml", "xvm":"application/xv+xml",/*
*/"yang":"application/yang",/*
*/"yin":"application/yin+xml",/*
*/"zip":"application/zip",/*
# audio/1d-interleaved-parityfec
# audio/32kadpcm
# audio/3gpp
# audio/3gpp2
# audio/ac3
*/"adp":"audio/adpcm",/*
# audio/amr
# audio/amr-wb
# audio/amr-wb+
# audio/asc
# audio/atrac-advanced-lossless
# audio/atrac-x
# audio/atrac3
*/"au":"audio/basic", "snd":"audio/basic",/*
# audio/bv16
# audio/bv32
# audio/clearmode
# audio/cn
# audio/dat12
# audio/dls
# audio/dsr-es201108
# audio/dsr-es202050
# audio/dsr-es202211
# audio/dsr-es202212
# audio/dv
# audio/dvi4
# audio/eac3
# audio/evrc
# audio/evrc-qcp
# audio/evrc0
# audio/evrc1
# audio/evrcb
# audio/evrcb0
# audio/evrcb1
# audio/evrcwb
# audio/evrcwb0
# audio/evrcwb1
# audio/example
# audio/fwdred
# audio/g719
# audio/g722
# audio/g7221
# audio/g723
# audio/g726-16
# audio/g726-24
# audio/g726-32
# audio/g726-40
# audio/g728
# audio/g729
# audio/g7291
# audio/g729d
# audio/g729e
# audio/gsm
# audio/gsm-efr
# audio/gsm-hr-08
# audio/ilbc
# audio/ip-mr_v2.5
# audio/isac
# audio/l16
# audio/l20
# audio/l24
# audio/l8
# audio/lpc
*/"mid":"audio/midi", "midi":"audio/midi", "kar":"audio/midi", "rmi":"audio/midi",/*
# audio/mobile-xmf
*/"mp4a":"audio/mp4",/*
# audio/mp4a-latm
# audio/mpa
# audio/mpa-robust
*/"mpga":"audio/mpeg", "mp2":"audio/mpeg", "mp2a":"audio/mpeg", "mp3":"audio/mpeg", "m2a":"audio/mpeg", "m3a":"audio/mpeg",/*
# audio/mpeg4-generic
# audio/musepack
*/"oga":"audio/ogg", "ogg":"audio/ogg", "spx":"audio/ogg",/*
# audio/opus
# audio/parityfec
# audio/pcma
# audio/pcma-wb
# audio/pcmu-wb
# audio/pcmu
# audio/prs.sid
# audio/qcelp
# audio/red
# audio/rtp-enc-aescm128
# audio/rtp-midi
# audio/rtx
*/"s3m":"audio/s3m",/*
*/"sil":"audio/silk",/*
# audio/smv
# audio/smv0
# audio/smv-qcp
# audio/sp-midi
# audio/speex
# audio/t140c
# audio/t38
# audio/telephone-event
# audio/tone
# audio/uemclip
# audio/ulpfec
# audio/vdvi
# audio/vmr-wb
# audio/vnd.3gpp.iufp
# audio/vnd.4sb
# audio/vnd.audiokoz
# audio/vnd.celp
# audio/vnd.cisco.nse
# audio/vnd.cmles.radio-events
# audio/vnd.cns.anp1
# audio/vnd.cns.inf1
*/"uva":"audio/vnd.dece.audio", "uvva":"audio/vnd.dece.audio",/*
*/"eol":"audio/vnd.digital-winds",/*
# audio/vnd.dlna.adts
# audio/vnd.dolby.heaac.1
# audio/vnd.dolby.heaac.2
# audio/vnd.dolby.mlp
# audio/vnd.dolby.mps
# audio/vnd.dolby.pl2
# audio/vnd.dolby.pl2x
# audio/vnd.dolby.pl2z
# audio/vnd.dolby.pulse.1
*/"dra":"audio/vnd.dra",/*
*/"dts":"audio/vnd.dts",/*
*/"dtshd":"audio/vnd.dts.hd",/*
# audio/vnd.dvb.file
# audio/vnd.everad.plj
# audio/vnd.hns.audio
*/"lvp":"audio/vnd.lucent.voice",/*
*/"pya":"audio/vnd.ms-playready.media.pya",/*
# audio/vnd.nokia.mobile-xmf
# audio/vnd.nortel.vbk
*/"ecelp4800":"audio/vnd.nuera.ecelp4800",/*
*/"ecelp7470":"audio/vnd.nuera.ecelp7470",/*
*/"ecelp9600":"audio/vnd.nuera.ecelp9600",/*
# audio/vnd.octel.sbc
# audio/vnd.qcelp
# audio/vnd.rhetorex.32kadpcm
*/"rip":"audio/vnd.rip",/*
# audio/vnd.sealedmedia.softseal.mpeg
# audio/vnd.vmx.cvsd
# audio/vorbis
# audio/vorbis-config
*/"weba":"audio/webm",/*
*/"aac":"audio/x-aac",/*
*/"aif":"audio/x-aiff", "aiff":"audio/x-aiff", "aifc":"audio/x-aiff",/*
*/"caf":"audio/x-caf",/*
*/"flac":"audio/x-flac",/*
*/"mka":"audio/x-matroska",/*
*/"m3u":"audio/x-mpegurl",/*
*/"wax":"audio/x-ms-wax",/*
*/"wma":"audio/x-ms-wma",/*
*/"ram":"audio/x-pn-realaudio", "ra":"audio/x-pn-realaudio",/*
*/"rmp":"audio/x-pn-realaudio-plugin",/*
# audio/x-tta
*/"wav":"audio/x-wav",/*
*/"xm":"audio/xm",/*
*/"cdx":"chemical/x-cdx",/*
*/"cif":"chemical/x-cif",/*
*/"cmdf":"chemical/x-cmdf",/*
*/"cml":"chemical/x-cml",/*
*/"csml":"chemical/x-csml",/*
# chemical/x-pdb
*/"xyz":"chemical/x-xyz",/*
*/"bmp":"image/bmp",/*
*/"cgm":"image/cgm",/*
# image/example
# image/fits
*/"g3":"image/g3fax",/*
*/"gif":"image/gif",/*
*/"ief":"image/ief",/*
# image/jp2
*/"jpeg":"image/jpeg", "jpg":"image/jpeg", "jpe":"image/jpeg",/*
# image/jpm
# image/jpx
*/"ktx":"image/ktx",/*
# image/naplps
*/"png":"image/png",/*
*/"btif":"image/prs.btif",/*
# image/prs.pti
*/"sgi":"image/sgi",/*
*/"svg":"image/svg+xml", "svgz":"image/svg+xml",/*
# image/t38
*/"tiff":"image/tiff", "tif":"image/tiff",/*
# image/tiff-fx
*/"psd":"image/vnd.adobe.photoshop",/*
# image/vnd.cns.inf2
*/"uvi":"image/vnd.dece.graphic", "uvvi":"image/vnd.dece.graphic", "uvg":"image/vnd.dece.graphic", "uvvg":"image/vnd.dece.graphic",/*
*/"sub":"image/vnd.dvb.subtitle",/*
*/"djvu":"image/vnd.djvu", "djv":"image/vnd.djvu",/*
*/"dwg":"image/vnd.dwg",/*
*/"dxf":"image/vnd.dxf",/*
*/"fbs":"image/vnd.fastbidsheet",/*
*/"fpx":"image/vnd.fpx",/*
*/"fst":"image/vnd.fst",/*
*/"mmr":"image/vnd.fujixerox.edmics-mmr",/*
*/"rlc":"image/vnd.fujixerox.edmics-rlc",/*
# image/vnd.globalgraphics.pgb
# image/vnd.microsoft.icon
# image/vnd.mix
*/"mdi":"image/vnd.ms-modi",/*
*/"wdp":"image/vnd.ms-photo",/*
*/"npx":"image/vnd.net-fpx",/*
# image/vnd.radiance
# image/vnd.sealed.png
# image/vnd.sealedmedia.softseal.gif
# image/vnd.sealedmedia.softseal.jpg
# image/vnd.svf
*/"wbmp":"image/vnd.wap.wbmp",/*
*/"xif":"image/vnd.xiff",/*
*/"webp":"image/webp",/*
*/"3ds":"image/x-3ds",/*
*/"ras":"image/x-cmu-raster",/*
*/"cmx":"image/x-cmx",/*
*/"fh":"image/x-freehand", "fhc":"image/x-freehand", "fh4":"image/x-freehand", "fh5":"image/x-freehand", "fh7":"image/x-freehand",/*
*/"ico":"image/x-icon",/*
*/"sid":"image/x-mrsid-image",/*
*/"pcx":"image/x-pcx",/*
*/"pic":"image/x-pict", "pct":"image/x-pict",/*
*/"pnm":"image/x-portable-anymap",/*
*/"pbm":"image/x-portable-bitmap",/*
*/"pgm":"image/x-portable-graymap",/*
*/"ppm":"image/x-portable-pixmap",/*
*/"rgb":"image/x-rgb",/*
*/"tga":"image/x-tga",/*
*/"xbm":"image/x-xbitmap",/*
*/"xpm":"image/x-xpixmap",/*
*/"xwd":"image/x-xwindowdump",/*
# message/cpim
# message/delivery-status
# message/disposition-notification
# message/example
# message/external-body
# message/feedback-report
# message/global
# message/global-delivery-status
# message/global-disposition-notification
# message/global-headers
# message/http
# message/imdn+xml
# message/news
# message/partial
*/"eml":"message/rfc822", "mime":"message/rfc822",/*
# message/s-http
# message/sip
# message/sipfrag
# message/tracking-status
# message/vnd.si.simp
# model/example
*/"igs":"model/iges", "iges":"model/iges",/*
*/"msh":"model/mesh", "mesh":"model/mesh", "silo":"model/mesh",/*
*/"dae":"model/vnd.collada+xml",/*
*/"dwf":"model/vnd.dwf",/*
# model/vnd.flatland.3dml
*/"gdl":"model/vnd.gdl",/*
# model/vnd.gs-gdl
# model/vnd.gs.gdl
*/"gtw":"model/vnd.gtw",/*
# model/vnd.moml+xml
*/"mts":"model/vnd.mts",/*
# model/vnd.parasolid.transmit.binary
# model/vnd.parasolid.transmit.text
*/"vtu":"model/vnd.vtu",/*
*/"wrl":"model/vrml", "vrml":"model/vrml",/*
*/"x3db":"model/x3d+binary", "x3dbz":"model/x3d+binary",/*
*/"x3dv":"model/x3d+vrml", "x3dvz":"model/x3d+vrml",/*
*/"x3d":"model/x3d+xml", "x3dz":"model/x3d+xml",/*
# multipart/alternative
# multipart/appledouble
# multipart/byteranges
# multipart/digest
# multipart/encrypted
# multipart/example
# multipart/form-data
# multipart/header-set
# multipart/mixed
# multipart/parallel
# multipart/related
# multipart/report
# multipart/signed
# multipart/voice-message
# text/1d-interleaved-parityfec
*/"appcache":"text/cache-manifest",/*
*/"ics":"text/calendar", "ifb":"text/calendar",/*
*/"css":"text/css",/*
*/"csv":"text/csv",/*
# text/directory
# text/dns
# text/ecmascript
# text/enriched
# text/example
# text/fwdred
*/"html":"text/html", "htm":"text/html",/*
# text/javascript
*/"n3":"text/n3",/*
# text/parityfec
*/"txt":"text/plain", "text":"text/plain", "conf":"text/plain", "def":"text/plain", "list":"text/plain", "log":"text/plain", "in":"text/plain",/*
# text/prs.fallenstein.rst
*/"dsc":"text/prs.lines.tag",/*
# text/vnd.radisys.msml-basic-layout
# text/red
# text/rfc822-headers
*/"rtx":"text/richtext",/*
# text/rtf
# text/rtp-enc-aescm128
# text/rtx
*/"sgml":"text/sgml", "sgm":"text/sgml",/*
# text/t140
*/"tsv":"text/tab-separated-values",/*
*/"t":"text/troff", "tr":"text/troff", "roff":"text/troff", "man":"text/troff", "me":"text/troff", "ms":"text/troff",/*
*/"ttl":"text/turtle",/*
# text/ulpfec
*/"uri":"text/uri-list", "uris":"text/uri-list", "urls":"text/uri-list",/*
*/"vcard":"text/vcard",/*
# text/vnd.abc
*/"curl":"text/vnd.curl",/*
*/"dcurl":"text/vnd.curl.dcurl",/*
*/"scurl":"text/vnd.curl.scurl",/*
*/"mcurl":"text/vnd.curl.mcurl",/*
# text/vnd.dmclientscript
*/"sub":"text/vnd.dvb.subtitle",/*
# text/vnd.esmertec.theme-descriptor
*/"fly":"text/vnd.fly",/*
*/"flx":"text/vnd.fmi.flexstor",/*
*/"gv":"text/vnd.graphviz",/*
*/"3dml":"text/vnd.in3d.3dml",/*
*/"spot":"text/vnd.in3d.spot",/*
# text/vnd.iptc.newsml
# text/vnd.iptc.nitf
# text/vnd.latex-z
# text/vnd.motorola.reflex
# text/vnd.ms-mediapackage
# text/vnd.net2phone.commcenter.command
# text/vnd.si.uricatalogue
*/"jad":"text/vnd.sun.j2me.app-descriptor",/*
# text/vnd.trolltech.linguist
# text/vnd.wap.si
# text/vnd.wap.sl
*/"wml":"text/vnd.wap.wml",/*
*/"wmls":"text/vnd.wap.wmlscript",/*
*/"s":"text/x-asm", "asm":"text/x-asm",/*
*/"c":"text/x-c", "cc":"text/x-c", "cxx":"text/x-c", "cpp":"text/x-c", "h":"text/x-c", "hh":"text/x-c", "dic":"text/x-c",/*
*/"f":"text/x-fortran", "for":"text/x-fortran", "f77":"text/x-fortran", "f90":"text/x-fortran",/*
*/"java":"text/x-java-source",/*
*/"opml":"text/x-opml",/*
*/"p":"text/x-pascal", "pas":"text/x-pascal",/*
*/"nfo":"text/x-nfo",/*
*/"etx":"text/x-setext",/*
*/"sfv":"text/x-sfv",/*
*/"uu":"text/x-uuencode",/*
*/"vcs":"text/x-vcalendar",/*
*/"vcf":"text/x-vcard",/*
# text/xml
# text/xml-external-parsed-entity
# video/1d-interleaved-parityfec
*/"3gp":"video/3gpp",/*
# video/3gpp-tt
*/"3g2":"video/3gpp2",/*
# video/bmpeg
# video/bt656
# video/celb
# video/dv
# video/example
*/"h261":"video/h261",/*
*/"h263":"video/h263",/*
# video/h263-1998
# video/h263-2000
*/"h264":"video/h264",/*
# video/h264-rcdo
# video/h264-svc
*/"jpgv":"video/jpeg",/*
# video/jpeg2000
*/"jpm":"video/jpm", "jpgm":"video/jpm",/*
*/"mj2":"video/mj2", "mjp2":"video/mj2",/*
# video/mp1s
# video/mp2p
# video/mp2t
*/"mp4":"video/mp4", "mp4v":"video/mp4", "mpg4":"video/mp4",/*
# video/mp4v-es
*/"mpeg":"video/mpeg", "mpg":"video/mpeg", "mpe":"video/mpeg", "m1v":"video/mpeg", "m2v":"video/mpeg",/*
# video/mpeg4-generic
# video/mpv
# video/nv
*/"ogv":"video/ogg",/*
# video/parityfec
# video/pointer
*/"qt":"video/quicktime", "mov":"video/quicktime",/*
# video/raw
# video/rtp-enc-aescm128
# video/rtx
# video/smpte292m
# video/ulpfec
# video/vc1
# video/vnd.cctv
*/"uvh":"video/vnd.dece.hd", "uvvh":"video/vnd.dece.hd",/*
*/"uvm":"video/vnd.dece.mobile", "uvvm":"video/vnd.dece.mobile",/*
# video/vnd.dece.mp4
*/"uvp":"video/vnd.dece.pd", "uvvp":"video/vnd.dece.pd",/*
*/"uvs":"video/vnd.dece.sd", "uvvs":"video/vnd.dece.sd",/*
*/"uvv":"video/vnd.dece.video", "uvvv":"video/vnd.dece.video",/*
# video/vnd.directv.mpeg
# video/vnd.directv.mpeg-tts
# video/vnd.dlna.mpeg-tts
*/"dvb":"video/vnd.dvb.file",/*
*/"fvt":"video/vnd.fvt",/*
# video/vnd.hns.video
# video/vnd.iptvforum.1dparityfec-1010
# video/vnd.iptvforum.1dparityfec-2005
# video/vnd.iptvforum.2dparityfec-1010
# video/vnd.iptvforum.2dparityfec-2005
# video/vnd.iptvforum.ttsavc
# video/vnd.iptvforum.ttsmpeg2
# video/vnd.motorola.video
# video/vnd.motorola.videop
*/"mxu":"video/vnd.mpegurl", "m4u":"video/vnd.mpegurl",/*
*/"pyv":"video/vnd.ms-playready.media.pyv",/*
# video/vnd.nokia.interleaved-multimedia
# video/vnd.nokia.videovoip
# video/vnd.objectvideo
# video/vnd.sealed.mpeg1
# video/vnd.sealed.mpeg4
# video/vnd.sealed.swf
# video/vnd.sealedmedia.softseal.mov
*/"uvu":"video/vnd.uvvu.mp4", "uvvu":"video/vnd.uvvu.mp4",/*
*/"viv":"video/vnd.vivo",/*
*/"webm":"video/webm",/*
*/"f4v":"video/x-f4v",/*
*/"fli":"video/x-fli",/*
*/"flv":"video/x-flv",/*
*/"m4v":"video/x-m4v",/*
*/"mkv":"video/x-matroska", "mk3d":"video/x-matroska", "mks":"video/x-matroska",/*
*/"mng":"video/x-mng",/*
*/"asf":"video/x-ms-asf", "asx":"video/x-ms-asf",/*
*/"vob":"video/x-ms-vob",/*
*/"wm":"video/x-ms-wm",/*
*/"wmv":"video/x-ms-wmv",/*
*/"wmx":"video/x-ms-wmx",/*
*/"wvx":"video/x-ms-wvx",/*
*/"avi":"video/x-msvideo",/*
*/"movie":"video/x-sgi-movie",/*
*/"smv":"video/x-smv",/*
*/"ice":"x-conference/x-cooltalk",/**/ } }; }());
/* MODULE_END */
(function () { var module = {}, exports = module.exports = {},process = global.process || {};require = function (module) { return required[module] };
/* MODULE_BEGIN https://raw.githubusercontent.com/joyent/node/master/lib/util.js */
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // This could be a boxed primitive (new String(), etc.), check valueOf()
  // NOTE: Avoid calling `valueOf` on `Date` instance because it will return
  // a number which, when object has some additional user-stored `keys`,
  // will be printed out.
  var formatted;
  var raw = value;
  try {
    // the .valueOf() call can fail for a multitude of reasons
    if (!isDate(value))
      raw = value.valueOf();
  } catch (e) {
    // ignore...
  }

  if (isString(raw)) {
    // for boxed Strings, we have to remove the 0-n indexed entries,
    // since they just noisey up the output and are redundant
    keys = keys.filter(function(key) {
      return !(key >= 0 && key < raw.length);
    });
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
    // now check the `raw` value to handle boxed primitives
    if (isString(raw)) {
      formatted = formatPrimitiveNoColor(ctx, raw);
      return ctx.stylize('[String: ' + formatted + ']', 'string');
    }
    if (isNumber(raw)) {
      formatted = formatPrimitiveNoColor(ctx, raw);
      return ctx.stylize('[Number: ' + formatted + ']', 'number');
    }
    if (isBoolean(raw)) {
      formatted = formatPrimitiveNoColor(ctx, raw);
      return ctx.stylize('[Boolean: ' + formatted + ']', 'boolean');
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  // Make boxed primitive Strings look like such
  if (isString(raw)) {
    formatted = formatPrimitiveNoColor(ctx, raw);
    base = ' ' + '[String: ' + formatted + ']';
  }

  // Make boxed primitive Numbers look like such
  if (isNumber(raw)) {
    formatted = formatPrimitiveNoColor(ctx, raw);
    base = ' ' + '[Number: ' + formatted + ']';
  }

  // Make boxed primitive Booleans look like such
  if (isBoolean(raw)) {
    formatted = formatPrimitiveNoColor(ctx, raw);
    base = ' ' + '[Boolean: ' + formatted + ']';
  }

  if (keys.length === 0 && (!array || value.length === 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value)) {
    // Format -0 as '-0'. Strict equality won't distinguish 0 from -0,
    // so instead we use the fact that 1 / -0 < 0 whereas 1 / 0 > 0 .
    if (value === 0 && 1 / value < 0)
      return ctx.stylize('-0', 'number');
    return ctx.stylize('' + value, 'number');
  }
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatPrimitiveNoColor(ctx, value) {
  var stylize = ctx.stylize;
  ctx.stylize = stylizeNoColor;
  var str = formatPrimitive(ctx, value);
  ctx.stylize = stylize;
  return str;
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'")
                 .replace(/\\\\/g, '\\');
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
var isArray = exports.isArray = Array.isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

function isBuffer(arg) {
  return arg instanceof Buffer;
}
exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}


// Deprecated old stuff.

exports.p = exports.deprecate(function() {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    console.error(exports.inspect(arguments[i]));
  }
}, 'util.p: Use console.error() instead');


exports.exec = exports.deprecate(function() {
  return require('child_process').exec.apply(this, arguments);
}, 'util.exec is now called `child_process.exec`.');


exports.print = exports.deprecate(function() {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    process.stdout.write(String(arguments[i]));
  }
}, 'util.print: Use console.log instead');


exports.puts = exports.deprecate(function() {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    process.stdout.write(arguments[i] + '\n');
  }
}, 'util.puts: Use console.log instead');


exports.debug = exports.deprecate(function(x) {
  process.stderr.write('DEBUG: ' + x + '\n');
}, 'util.debug: Use console.error instead');


exports.error = exports.deprecate(function(x) {
  for (var i = 0, len = arguments.length; i < len; ++i) {
    process.stderr.write(arguments[i] + '\n');
  }
}, 'util.error: Use console.error instead');


exports.pump = exports.deprecate(function(readStream, writeStream, callback) {
  var callbackCalled = false;

  function call(a, b, c) {
    if (callback && !callbackCalled) {
      callback(a, b, c);
      callbackCalled = true;
    }
  }

  readStream.addListener('data', function(chunk) {
    if (writeStream.write(chunk) === false) readStream.pause();
  });

  writeStream.addListener('drain', function() {
    readStream.resume();
  });

  readStream.addListener('end', function() {
    writeStream.end();
  });

  readStream.addListener('close', function() {
    call();
  });

  readStream.addListener('error', function(err) {
    writeStream.end();
    call(err);
  });

  writeStream.addListener('error', function(err) {
    readStream.destroy();
    call(err);
  });
}, 'util.pump(): Use readableStream.pipe() instead');


var uv;
exports._errnoException = function(err, syscall, original) {
  if (isUndefined(uv)) uv = process.binding('uv');
  var errname = uv.errname(err);
  var message = syscall + ' ' + errname;
  if (original)
    message += ' ' + original;
  var e = new Error(message);
  e.code = errname;
  e.errno = errname;
  e.syscall = syscall;
  return e;
};
/* MODULE_END */
required.util = module.exports; }());(function () { var module = {}, exports = module.exports = {},process = global.process || {};require = function (module) { return required[module] };
/* MODULE_BEGIN https://raw.githubusercontent.com/joyent/node/master/lib/path.js */
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var isWindows = process.platform === 'win32';
var util = require('util');


// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}


if (isWindows) {
  // Regex to split a windows path into three parts: [*, device, slash,
  // tail] windows-only
  var splitDeviceRe =
      /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

  // Regex to split the tail part of the above into [*, dir, basename, ext]
  var splitTailRe =
      /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

  // Function to split a filename into [root, dir, basename, ext]
  // windows version
  var splitPath = function(filename) {
    // Separate device+slash from tail
    var result = splitDeviceRe.exec(filename),
        device = (result[1] || '') + (result[2] || ''),
        tail = result[3] || '';
    // Split the tail into dir, basename and extension
    var result2 = splitTailRe.exec(tail),
        dir = result2[1],
        basename = result2[2],
        ext = result2[3];
    return [device, dir, basename, ext];
  };

  var normalizeUNCRoot = function(device) {
    return '\\\\' + device.replace(/^[\\\/]+/, '').replace(/[\\\/]+/g, '\\');
  };

  // path.resolve([from ...], to)
  // windows version
  exports.resolve = function() {
    var resolvedDevice = '',
        resolvedTail = '',
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1; i--) {
      var path;
      if (i >= 0) {
        path = arguments[i];
      } else if (!resolvedDevice) {
        path = process.cwd();
      } else {
        // Windows has the concept of drive-specific current working
        // directories. If we've resolved a drive letter but not yet an
        // absolute path, get cwd for that drive. We're sure the device is not
        // an unc path at this points, because unc paths are always absolute.
        path = process.env['=' + resolvedDevice];
        // Verify that a drive-local cwd was found and that it actually points
        // to our drive. If not, default to the drive's root.
        if (!path || path.substr(0, 3).toLowerCase() !==
            resolvedDevice.toLowerCase() + '\\') {
          path = resolvedDevice + '\\';
        }
      }

      // Skip empty and invalid entries
      if (!util.isString(path)) {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }

      var result = splitDeviceRe.exec(path),
          device = result[1] || '',
          isUnc = device && device.charAt(1) !== ':',
          isAbsolute = exports.isAbsolute(path),
          tail = result[3];

      if (device &&
          resolvedDevice &&
          device.toLowerCase() !== resolvedDevice.toLowerCase()) {
        // This path points to another device so it is not applicable
        continue;
      }

      if (!resolvedDevice) {
        resolvedDevice = device;
      }
      if (!resolvedAbsolute) {
        resolvedTail = tail + '\\' + resolvedTail;
        resolvedAbsolute = isAbsolute;
      }

      if (resolvedDevice && resolvedAbsolute) {
        break;
      }
    }

    // Convert slashes to backslashes when `resolvedDevice` points to an UNC
    // root. Also squash multiple slashes into a single one where appropriate.
    if (isUnc) {
      resolvedDevice = normalizeUNCRoot(resolvedDevice);
    }

    // At this point the path should be resolved to a full absolute path,
    // but handle relative paths to be safe (might happen when process.cwd()
    // fails)

    // Normalize the tail path

    function f(p) {
      return !!p;
    }

    resolvedTail = normalizeArray(resolvedTail.split(/[\\\/]+/).filter(f),
                                  !resolvedAbsolute).join('\\');

    return (resolvedDevice + (resolvedAbsolute ? '\\' : '') + resolvedTail) ||
           '.';
  };

  // windows version
  exports.normalize = function(path) {
    var result = splitDeviceRe.exec(path),
        device = result[1] || '',
        isUnc = device && device.charAt(1) !== ':',
        isAbsolute = exports.isAbsolute(path),
        tail = result[3],
        trailingSlash = /[\\\/]$/.test(tail);

    // If device is a drive letter, we'll normalize to lower case.
    if (device && device.charAt(1) === ':') {
      device = device[0].toLowerCase() + device.substr(1);
    }

    // Normalize the tail path
    tail = normalizeArray(tail.split(/[\\\/]+/).filter(function(p) {
      return !!p;
    }), !isAbsolute).join('\\');

    if (!tail && !isAbsolute) {
      tail = '.';
    }
    if (tail && trailingSlash) {
      tail += '\\';
    }

    // Convert slashes to backslashes when `device` points to an UNC root.
    // Also squash multiple slashes into a single one where appropriate.
    if (isUnc) {
      device = normalizeUNCRoot(device);
    }

    return device + (isAbsolute ? '\\' : '') + tail;
  };

  // windows version
  exports.isAbsolute = function(path) {
    var result = splitDeviceRe.exec(path),
        device = result[1] || '',
        isUnc = device && device.charAt(1) !== ':';
    // UNC paths are always absolute
    return !!result[2] || isUnc;
  };

  // windows version
  exports.join = function() {
    function f(p) {
      if (!util.isString(p)) {
        throw new TypeError('Arguments to path.join must be strings');
      }
      return p;
    }

    var paths = Array.prototype.filter.call(arguments, f);
    var joined = paths.join('\\');

    // Make sure that the joined path doesn't start with two slashes, because
    // normalize() will mistake it for an UNC path then.
    //
    // This step is skipped when it is very clear that the user actually
    // intended to point at an UNC path. This is assumed when the first
    // non-empty string arguments starts with exactly two slashes followed by
    // at least one more non-slash character.
    //
    // Note that for normalize() to treat a path as an UNC path it needs to
    // have at least 2 components, so we don't filter for that here.
    // This means that the user can use join to construct UNC paths from
    // a server name and a share name; for example:
    //   path.join('//server', 'share') -> '\\\\server\\share\')
    if (!/^[\\\/]{2}[^\\\/]/.test(paths[0])) {
      joined = joined.replace(/^[\\\/]{2,}/, '\\');
    }

    return exports.normalize(joined);
  };

  // path.relative(from, to)
  // it will solve the relative path from 'from' to 'to', for instance:
  // from = 'C:\\orandea\\test\\aaa'
  // to = 'C:\\orandea\\impl\\bbb'
  // The output of the function should be: '..\\..\\impl\\bbb'
  // windows version
  exports.relative = function(from, to) {
    from = exports.resolve(from);
    to = exports.resolve(to);

    // windows is not case sensitive
    var lowerFrom = from.toLowerCase();
    var lowerTo = to.toLowerCase();

    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }

      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }

      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }

    var toParts = trim(to.split('\\'));

    var lowerFromParts = trim(lowerFrom.split('\\'));
    var lowerToParts = trim(lowerTo.split('\\'));

    var length = Math.min(lowerFromParts.length, lowerToParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (lowerFromParts[i] !== lowerToParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    if (samePartsLength == 0) {
      return to;
    }

    var outputParts = [];
    for (var i = samePartsLength; i < lowerFromParts.length; i++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('\\');
  };

  exports.sep = '\\';
  exports.delimiter = ';';

} else /* posix */ {

  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  var splitPath = function(filename) {
    return splitPathRe.exec(filename).slice(1);
  };

  // path.resolve([from ...], to)
  // posix version
  exports.resolve = function() {
    var resolvedPath = '',
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = (i >= 0) ? arguments[i] : process.cwd();

      // Skip empty and invalid entries
      if (!util.isString(path)) {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(resolvedPath.split('/').filter(function(p) {
      return !!p;
    }), !resolvedAbsolute).join('/');

    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
  };

  // path.normalize(path)
  // posix version
  exports.normalize = function(path) {
    var isAbsolute = exports.isAbsolute(path),
        trailingSlash = path[path.length - 1] === '/',
        segments = path.split('/'),
        nonEmptySegments = [];

    // Normalize the path
    for (var i = 0; i < segments.length; i++) {
      if (segments[i]) {
        nonEmptySegments.push(segments[i]);
      }
    }
    path = normalizeArray(nonEmptySegments, !isAbsolute).join('/');

    if (!path && !isAbsolute) {
      path = '.';
    }
    if (path && trailingSlash) {
      path += '/';
    }

    return (isAbsolute ? '/' : '') + path;
  };

  // posix version
  exports.isAbsolute = function(path) {
    return path.charAt(0) === '/';
  };

  // posix version
  exports.join = function() {
    var path = '';
    for (var i = 0; i < arguments.length; i++) {
      var segment = arguments[i];
      if (!util.isString(segment)) {
        throw new TypeError('Arguments to path.join must be strings');
      }
      if (segment) {
        if (!path) {
          path += segment;
        } else {
          path += '/' + segment;
        }
      }
    }
    return exports.normalize(path);
  };


  // path.relative(from, to)
  // posix version
  exports.relative = function(from, to) {
    from = exports.resolve(from).substr(1);
    to = exports.resolve(to).substr(1);

    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }

      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }

      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }

    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));

    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('/');
  };

  exports.sep = '/';
  exports.delimiter = ':';
}

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};


exports.exists = util.deprecate(function(path, callback) {
  require('fs').exists(path, callback);
}, 'path.exists is now called `fs.exists`.');


exports.existsSync = util.deprecate(function(path) {
  return require('fs').existsSync(path);
}, 'path.existsSync is now called `fs.existsSync`.');


if (isWindows) {
  exports._makeLong = function(path) {
    // Note: this will *probably* throw somewhere.
    if (!util.isString(path))
      return path;

    if (!path) {
      return '';
    }

    var resolvedPath = exports.resolve(path);

    if (/^[a-zA-Z]\:\\/.test(resolvedPath)) {
      // path is local filesystem path, which needs to be converted
      // to long UNC path.
      return '\\\\?\\' + resolvedPath;
    } else if (/^\\\\[^?.]/.test(resolvedPath)) {
      // path is network UNC path, which needs to be converted
      // to long UNC path.
      return '\\\\?\\UNC\\' + resolvedPath.substring(2);
    }

    return path;
  };
} else {
  exports._makeLong = function(path) {
    return path;
  };
}
/* MODULE_END */
required.path = module.exports; }());(function () { var module = {}, exports = module.exports = {},process = global.process || {};require = function (module) { return required[module] };
/* MODULE_BEGIN https://raw.githubusercontent.com/joyent/node/master/lib/punycode.js */
/*! http://mths.be/punycode v1.2.3 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.3',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return punycode;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));
/* MODULE_END */
required.punycode = module.exports; }());(function () { var module = {}, exports = module.exports = {},process = global.process || {};require = function (module) { return required[module] };
/* MODULE_BEGIN https://raw.githubusercontent.com/joyent/node/master/lib/querystring.js */
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// Query String Utilities

var QueryString = exports;
var util = require('util');


// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}


function charCode(c) {
  return c.charCodeAt(0);
}


// a safe fast alternative to decodeURIComponent
QueryString.unescapeBuffer = function(s, decodeSpaces) {
  var out = new Buffer(s.length);
  var state = 'CHAR'; // states: CHAR, HEX0, HEX1
  var n, m, hexchar;

  for (var inIndex = 0, outIndex = 0; inIndex <= s.length; inIndex++) {
    var c = s.charCodeAt(inIndex);
    switch (state) {
      case 'CHAR':
        switch (c) {
          case charCode('%'):
            n = 0;
            m = 0;
            state = 'HEX0';
            break;
          case charCode('+'):
            if (decodeSpaces) c = charCode(' ');
            // pass thru
          default:
            out[outIndex++] = c;
            break;
        }
        break;

      case 'HEX0':
        state = 'HEX1';
        hexchar = c;
        if (charCode('0') <= c && c <= charCode('9')) {
          n = c - charCode('0');
        } else if (charCode('a') <= c && c <= charCode('f')) {
          n = c - charCode('a') + 10;
        } else if (charCode('A') <= c && c <= charCode('F')) {
          n = c - charCode('A') + 10;
        } else {
          out[outIndex++] = charCode('%');
          out[outIndex++] = c;
          state = 'CHAR';
          break;
        }
        break;

      case 'HEX1':
        state = 'CHAR';
        if (charCode('0') <= c && c <= charCode('9')) {
          m = c - charCode('0');
        } else if (charCode('a') <= c && c <= charCode('f')) {
          m = c - charCode('a') + 10;
        } else if (charCode('A') <= c && c <= charCode('F')) {
          m = c - charCode('A') + 10;
        } else {
          out[outIndex++] = charCode('%');
          out[outIndex++] = hexchar;
          out[outIndex++] = c;
          break;
        }
        out[outIndex++] = 16 * n + m;
        break;
    }
  }

  // TODO support returning arbitrary buffers.

  return out.slice(0, outIndex - 1);
};


QueryString.unescape = function(s, decodeSpaces) {
  return QueryString.unescapeBuffer(s, decodeSpaces).toString();
};


QueryString.escape = function(str) {
  return encodeURIComponent(str);
};

var stringifyPrimitive = function(v) {
  if (util.isString(v))
    return v;
  if (util.isBoolean(v))
    return v ? 'true' : 'false';
  if (util.isNumber(v))
    return isFinite(v) ? v : '';
  return '';
};


QueryString.stringify = QueryString.encode = function(obj, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  if (util.isNull(obj)) {
    obj = undefined;
  }

  var encode = QueryString.escape;
  if (options && typeof options.encodeURIComponent === 'function') {
    encode = options.encodeURIComponent;
  }

  if (util.isObject(obj)) {
    return Object.keys(obj).map(function(k) {
      var ks = encode(stringifyPrimitive(k)) + eq;
      if (util.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encode(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encode(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }
  return '';
};

// Parse a key=val string.
QueryString.parse = QueryString.decode = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (!util.isString(qs) || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && util.isNumber(options.maxKeys)) {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  var decode = decodeURIComponent;
  if (options && typeof options.decodeURIComponent === 'function') {
    decode = options.decodeURIComponent;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    try {
      k = decode(kstr);
      v = decode(vstr);
    } catch (e) {
      k = QueryString.unescape(kstr, true);
      v = QueryString.unescape(vstr, true);
    }

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (util.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};
/* MODULE_END */
required.querystring = module.exports; }());(function () { var module = {}, exports = module.exports = {},process = global.process || {};require = function (module) { return required[module] };
/* MODULE_BEGIN https://raw.githubusercontent.com/joyent/node/master/lib/url.js */
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var punycode = require('punycode');
var util = require('util');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var hashSplit = url.split('#');
  hashSplit[0] = hashSplit[0].replace(/\\/g, '/');
  url = hashSplit.join('#');

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = this.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      this.hostname = newOut.join('.');
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  Object.keys(this).forEach(function(k) {
    result[k] = this[k];
  }, this);

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    Object.keys(relative).forEach(function(k) {
      if (k !== 'protocol')
        result[k] = relative[k];
    });

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      Object.keys(relative).forEach(function(k) {
        result[k] = relative[k];
      });
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};
/* MODULE_END */
required.url = module.exports; }());
