import React, { Component } from 'react';
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom"
import { logoutUser } from "redux/actions/authActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

class SideMenu extends Component {
    constructor(props){
        super(props);
        this.state ={
            isSetting:false,
            isMasterdata: false,
        }
        this.changeMenu = this.changeMenu.bind(this);
    }

    changeMenu(e,param){
        e.preventDefault();
        if(param === 'masterdata'){
            this.setState({
                isMasterdata : !this.state.isMasterdata
            });
        }
        this.forceUpdate();
        
    }
    // getProps(param){
    //     if (param.auth.user) {
    //         let akses =param.auth.user.access;
            
    //         if(akses!==undefined&&akses!==null){
    //             // SETTING
    //             let pengaturan_umum                 = akses[0]['value']!==null?akses[0]['value']:"0";   //cek varaibale akses apabila tidak bernilai null
    //             let pengguna                        = akses[1]['value']!==null?akses[1]['value']:"0";   //cek varaibale akses apabila tidak bernilai null
    //             let lokasi                          = akses[2]['value']!==null?akses[2]['value']:"0";   //cek varaibale akses apabila tidak bernilai null
    //             //MASTERDATA
    //             let barang                          = akses[10]['value']!==null?akses[10]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let departemen                      = akses[11]['value']!==null?akses[11]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let supplier                        = akses[12]['value']!==null?akses[12]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let customer                        = akses[13]['value']!==null?akses[13]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let kas                             = akses[14]['value']!==null?akses[14]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let sales                           = akses[15]['value']!==null?akses[15]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let bank                            = akses[16]['value']!==null?akses[16]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let promo                           = akses[17]['value']!==null?akses[17]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             //PRODUKSI
    //             let produksi                        = akses[20]['value']!==null?akses[20]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             //INVENTORY
    //             let delivery_note                   = akses[30]['value']!==null?akses[30]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let alokasi                         = akses[31]['value']!==null?akses[31]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let approval_mutasi                 = akses[32]['value']!==null?akses[32]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let adjusment                       = akses[33]['value']!==null?akses[33]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let opname                          = akses[34]['value']!==null?akses[34]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let approval_opname                 = akses[35]['value']!==null?akses[35]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let packing                         = akses[36]['value']!==null?akses[36]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let expedisi                        = akses[37]['value']!==null?akses[37]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let approval_mutasi_jual_beli       = akses[38]['value']!==null?akses[38]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let bayar_mutasi_jual_beli          = akses[39]['value']!==null?akses[39]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             //PEMBELIAN
    //             let purchase_order                  = akses[40]['value']!==null?akses[40]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let receive_pembelian               = akses[41]['value']!==null?akses[41]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let retur_tanpa_nota                = akses[42]['value']!==null?akses[42]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             //TRANSAKSI
    //             let penjualan_barang                = akses[50]['value']!==null?akses[50]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let cash_trx                        = akses[51]['value']!==null?akses[50]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             //PEMBAYARAN
    //             let hutang                          = akses[60]['value']!==null?akses[60]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let piutang                         = akses[61]['value']!==null?akses[61]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             //REPORT
    //             let r_closing                       = akses[70]['value']!==null?akses[70]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_kas                           = akses[71]['value']!==null?akses[71]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_laba_rugi                     = akses[72]['value']!==null?akses[72]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_produksi                      = akses[73]['value']!==null?akses[73]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_arsip_penjualan               = akses[74]['value']!==null?akses[74]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_arsip_retur_penjualan         = akses[75]['value']!==null?akses[75]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_penjualan_by_customer         = akses[76]['value']!==null?akses[76]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_stock                         = akses[77]['value']!==null?akses[77]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_adjusment                     = akses[78]['value']!==null?akses[78]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_alokasi                       = akses[79]['value']!==null?akses[79]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_delivery_note                 = akses[80]['value']!==null?akses[80]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_opname                        = akses[81]['value']!==null?akses[81]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_mutasi                        = akses[82]['value']!==null?akses[82]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_alokasi_trx                   = akses[83]['value']!==null?akses[83]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_expedisi                      = akses[84]['value']!==null?akses[84]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_purchase_order                = akses[85]['value']!==null?akses[85]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_receive                       = akses[86]['value']!==null?akses[86]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_arsip_pembelian_by_supplier   = akses[87]['value']!==null?akses[87]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_hutang                        = akses[88]['value']!==null?akses[88]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_piutang                       = akses[89]['value']!==null?akses[89]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_trx                           = akses[88]['value']!==null?akses[88]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             let r_act                           = akses[89]['value']!==null?akses[89]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             //CETAK BARCODE
    //             let cetak_barcode                   = akses[90]['value']!==null?akses[90]['value']:"0"; //cek varaibale akses apabila tidak bernilai null
    //             // start pengecekan apabila fitur bernilai 0
    //             //setting
    //             if(pengaturan_umum!=='0'&&pengguna!=='0'&&lokasi!=='0'){
    //                 this.setState({modul_setting:true});
    //             }
    //             //masterdata
    //             if(barang!=='0'&&departemen!=='0'&&supplier!=='0'&&customer!=='0'&&kas!=='0'&&sales!=='0'&&bank!=='0'&&promo!=='0'){
    //                 this.setState({modul_masterdata:true});
    //             }
    //             //barangsi
    //             if(produksi!=='0'){
    //                 this.setState({modul_produksi:true});
    //             }
    //             //inventory
    //             if(delivery_note!=='0'&&alokasi!=='0'&&approval_mutasi!=='0'&&adjusment!=='0'&&opname!=='0'&&approval_opname!=='0'&&packing!=='0'&&expedisi!=='0'&&approval_mutasi_jual_beli!=='0'&&bayar_mutasi_jual_beli!=='0'){
    //                 this.setState({modul_inventory:true});
    //             }
    //             if(approval_mutasi_jual_beli!=='0'||bayar_mutasi_jual_beli!=='0'){
    //                 this.setState({modul_inventory:true,modul_inventory_mutasi:true});
    //             }
    //             if(opname!=='0'||approval_opname!=='0'){
    //                 this.setState({modul_inventory:true,modul_inventory_opname:true});
    //             }
    //             if(packing!=='0'||expedisi!=='0'){
    //                 this.setState({modul_inventory:true,modul_inventory_pengiriman:true});
    //             }
    //             if(purchase_order!=='0'||receive_pembelian!=='0'||retur_tanpa_nota!=='0'){
    //                 this.setState({modul_pembelian:true});
    //             }
    //             if(penjualan_barang!=='0'||cash_trx!=='0'){
    //                 this.setState({modul_penjualan:true});
    //             }
    //             if(hutang!=='0'||piutang!=='0'){
    //                 this.setState({modul_pembayaran:true});
    //             }
    //             if(
    //                 r_closing!=='0'||r_kas!=='0'||r_laba_rugi!=='0'||
    //                 r_produksi!=='0'||
    //                 r_arsip_penjualan!=='0'||r_arsip_retur_penjualan!=='0'||r_penjualan_by_customer!=='0'||
    //                 r_stock!=='0'||r_adjusment!=='0'|| r_alokasi!=='0'|| r_delivery_note!=='0'|| r_opname!=='0'|| r_mutasi!=='0'|| r_alokasi_trx!=='0'|| r_expedisi!=='0'||
    //                 r_purchase_order!=='0'|| r_receive!=='0'|| r_arsip_pembelian_by_supplier!=='0'||
    //                 r_hutang!=='0'|| r_piutang!=='0'
    //             ){
    //                 this.setState({modul_report:true});
    //             }
    //             if(r_arsip_penjualan!=='0'||r_arsip_retur_penjualan!=='0'||r_penjualan_by_customer!=='0'){
    //                 this.setState({modul_report:true,modul_report_penjualan:true});
    //             }
    //             if(r_stock!=='0'||r_adjusment!=='0'|| r_alokasi!=='0'|| r_delivery_note!=='0'|| r_opname!=='0'|| r_mutasi!=='0'|| r_alokasi_trx!=='0'|| r_expedisi!=='0'){
    //                 this.setState({modul_report:true,modul_report_inventory:true});
    //             }
    //             if(r_purchase_order!=='0'||r_receive!=='0'||r_arsip_pembelian_by_supplier!=='0'){
    //                 this.setState({modul_report:true,modul_report_pembelian:true});
    //             }
    //             if(r_hutang!=='0'||r_piutang!=='0'){
    //                 this.setState({modul_report:true,modul_report_pembayaran:true});
    //             }
    //             if(r_trx!=='0'||r_act!=='0'){
    //                 this.setState({modul_report:true,modul_report_log:true});
    //             }
    //             if(cetak_barcode!=='0'){
    //                 this.setState({modul_cetak_barcode:true});
    //             }
    //             // end pengecekan apabila fitur bernilai 0
    //             // start set ke state nilai yang sudah dicek
    //             this.setState({
    //                 // SETTING
    //                 pengaturan_umum:pengaturan_umum, pengguna:pengguna, lokasi:lokasi,
    //                 // //MASTERDATA
    //                 barang:barang, departemen:departemen, supplier:supplier, customer:customer, kas:kas,
    //                 sales:sales, bank:bank, promo:promo,
    //                 // //PRODUKSI
    //                 produksi:produksi,
    //                 //INVENTORY
    //                 delivery_note:delivery_note, alokasi:alokasi, approval_mutasi:approval_mutasi, adjusment:adjusment, opname:opname, approval_opname:approval_opname,
    //                 packing:packing, approval_mutasi_jual_beli:approval_mutasi_jual_beli, bayar_mutasi_jual_beli:bayar_mutasi_jual_beli,
    //                 //PEMBELIAN
    //                 purchase_order:purchase_order, receive_pembelian:receive_pembelian,
    //                 retur_tanpa_nota:retur_tanpa_nota,
    //                 //TRANSAKSI
    //                 penjualan_barang:penjualan_barang, cash_trx:cash_trx,
    //                 //PEMBAYARAN
    //                 hutang:hutang, piutang:piutang,
    //                 //REPORT
    //                 r_closing:r_closing, r_kas:r_kas, r_laba_rugi:r_laba_rugi, r_produksi:r_produksi, r_arsip_penjualan:r_arsip_penjualan,
    //                 r_arsip_retur_penjualan:r_arsip_retur_penjualan, r_penjualan_by_customer:r_penjualan_by_customer, r_stock:r_stock,
    //                 r_adjusment:r_adjusment, r_alokasi:r_alokasi, r_delivery_note:r_delivery_note, r_opname:r_opname, r_mutasi:r_mutasi,
    //                 r_alokasi_trx:r_alokasi_trx, r_expedisi:r_expedisi, r_purchase_order:r_purchase_order, r_receive:r_receive,
    //                 r_arsip_pembelian_by_supplier:r_arsip_pembelian_by_supplier, r_hutang:r_hutang, r_piutang:r_piutang, r_trx:r_trx, r_act:r_act,
    //                 //CETAK BARCODE
    //                 cetak_barcode:cetak_barcode,
    //             })
    //             // end set ke state nilai yang sudah dicek
    //         }
    //     }
    // }
    componentDidMount(){
        // this.getProps(this.props);
      
        const path = this.props.location.pathname;
        if(path==='/barang' || path==='/brand'){
            this.setState({
                isMasterdata:true
            })
        }
        // else if(
        //     path==='/department' ||
        //     path==='/supplier' ||
        //     path==='/sales' ||
        //     path==='/cash' ||
        //     path==='/customer' ||
        //     path==='/product' ||
        //     path==='/promo' ||
        //     path==='/bank' ||
        //     path==='/area' ||
        //     path==='/meja' 
        //     ){
            
        //     this.setState({
        //         isMasterdata:true
        //     })
        //         if(
        //             path==='/area' ||
        //             path==='/meja'
        //             ){
        //             this.setState({
        //                 isArea:true,
        //             })
        //         }
        // } else if(
        //     path === '/delivery_note' ||
        //     path === '/alokasi' ||
        //     path === '/adjustment'||
        //     path === '/approval_mutasi'||
        //     path === '/opname'||
        //     path === '/approval_opname' ||
        //     path === '/packing' ||
        //     path === '/expedisi' ||
        //     path === '/approval_mutasi_jual_beli' ||
        //     path === '/bayar_mutasi_jual_beli'
        // ){
            
        //     this.setState({
        //         isInventory:true
        //     });
        //     if(
        //         path==='/approval_mutasi_jual_beli' ||
        //         path==='/bayar_mutasi_jual_beli'
        //         ){
        //         this.setState({
        //             isTrxMutasi:true,
        //             isTrxOpname:false,
        //             isTrxPengiriman:false,
        //         })
        //     }
        //     if(path==='/opname' || path==='/approval_opname'){
        //         this.setState({
        //             isTrxMutasi:false,
        //             isTrxOpname:true,
        //             isTrxPengiriman:false,
        //         })
        //     }
        //     if(path==='/packing' || path==='/expedisi'){
        //         this.setState({
        //             isTrxMutasi:false,
        //             isTrxOpname:false,
        //             isTrxPengiriman:true,
        //         })
        //     }
        // } else if(path==='/purchase_order' || path === '/receive'|| path === '/retur_tanpa_nota'){
            
        //     this.setState({
        //         isReceive:true
        //     })
        // } else if(path==='/sale' || path==='/cash_trx'){
            
        //     this.setState({
        //         isSale:true
        //     })
        // } else if(
        //     path==='/report/cash'|| 
        //     path==='/report/laba_rugi'|| 
        //     path==='/report/sale_archive'|| 
        //     path==='/report/sale_retur_archive'|| 
        //     path==='/report/sale_by_cust_archive'|| 
        //     path==='/report/closing' ||
        //     path==='/report/inventory'||
        //     path==='/report/adjustment'|| 
        //     path==='/report/alokasi' ||
        //     path==='/report/dn' ||
        //     path==='/report/opname' ||
        //     path==='/report/expedisi' ||
        //     path==='/report/packing' ||
        //     path==='/report/mutation' ||
        //     path==='/report/alokasi_trx' ||
        //     path==='/report/production' ||

        //     path==='/report/po'||
        //     path==='/report/receive'||
        //     path==='/report/purchase_by_supplier'||

        //     path==='/report/hutang' ||
        //     path==='/report/piutang' ||

        //     path==='/log/trx' ||
        //     path==='/log/act'
        //     ){
            
        //     this.setState({
        //         isReport:true
        //     })
        //     if(
        //         path==='/report/inventory'|| 
        //         path==='/report/adjustment'|| 
        //         path==='/report/alokasi' || 
        //         path==='/report/opname' || 
        //         path==='/report/expedisi' || 
        //         path==='/report/packing' || 
        //         path==='/report/mutation' || 
        //         path==='/report/alokasi_trx' ||
        //         path==='/report/dn'){
               
        //        this.setState({
        //            isReportInventory:true
        //        })
        //    } else if(
        //        path==='/report/po'||
        //        path==='/report/receive'||
        //        path==='/report/purchase_by_supplier'
        //        ){
               
        //        this.setState({
        //            isReportPembelian:true
        //        })
        //    } else if(
        //        path==='/report/sale_archive' ||
        //        path==='/report/sale_retur_archive' ||
        //        path==='/report/sale_by_cust_archive'
        //        ){
               
        //        this.setState({
        //            isReportPenjualan:true
        //        })
        //    } else if(
        //        path==='/report/hutang' ||
        //        path==='/report/piutang'
        //        ){
               
        //        this.setState({
        //            isReportPembayaran:true
        //        })
        //    } else if(
        //        path==='/log/trx' ||
        //        path==='/log/act'
        //        ){
               
        //        this.setState({
        //            isReportLog:true
        //        })
        //    } 
        // } else if(path==='/trx_produksi'||path==='/approval_produksi'){
        //     this.setState({
        //         isProduction:true
        //     })
        // } else if(path==='/bayar_hutang'||path==='/bayar_piutang'){
        //     this.setState({
        //         isPaid:true
        //     })
        // }
    }
    componentWillReceiveProps = (nextProps) => {
        // this.getProps(nextProps);
        // if (this.props.activePath !== nextProps.activePath) {
        //     this.setState({
        //       activePath: nextProps.activePath
        //     })
        // }
    }

    // getSortByClass(){
    // setTimeout(() => {
    //     return 'none';
    //     }, 500);
    // }
    
    handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Apakah anda yakin akan logout aplikasi?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((result) => {
            if (result.value) {
                this.props.logoutUser();
            }
        })
    };
    render() {
        const path = this.props.location.pathname;
        return (
            <nav>
                <ul className="sidebar-menu" data-widget="tree">
                    {/* DASHBOARD MODUL START */}
                    <li  className={path==='/'?"active":''}><a href="/"> <i className="fa fa-dashboard" /><span> Dashboard</span></a></li>
                    {/* DASHBOARD MODUL END */}
                    
                    <li  className={path==='/invest'?"active":''}><Link to="/invest"> <i className="fa fa-btc" /><span> Invest</span></Link></li>
                    <li  className={path==='/withdraw'?"active":''}><Link to="/withdraw"> <i className="fa fa-exchange" /><span> Withdraw</span></Link></li>
                    <li  className={path==='/transfer'?"active":''}><Link to="/transfer"> <i className="fa fa-send" /><span> Transfer</span></Link></li>
                    <li  className={path==='/history'?"active":''}><Link to="/history"> <i className="fa fa-history" /><span> History</span></Link></li>

                    {/* LOGOUT MODUL START */}
                    <li><a href={null} style={{cursor:'pointer',color:'#a6b6d0'}} onClick={(event)=>this.handleLogout(event)}> <i className="fa fa-chain-broken" /><span> Logout</span></a></li>
                    {/* LOGOUT MODUL END */}
                </ul>
            </nav>
        )
    }
}
SideMenu.propTypes = {
    logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
    return{
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps,{logoutUser})(SideMenu))