     H/TITLE CHECK TOLLERANZE PREZZO

      /COPY VGMSRC/QCOPYGEN,VGMGEN_H
       CTL-OPT CCSID(*UCS2:1200) CCSIDCVT(*EXCP: *LIST) ;
      *-----------------------------------------------------*
      * Creazione SRVPGM
      *      CRTSRVPGM SRVPGM(SNSOBJ/ACW001)
      *      MODULE(SNSOBJ/ACW001)
      *      EXPORT(*SRCFILE)
      *      SRCFILE(ACQSRC/QBNDSRC)
      *      SRCMBR(ACW001BND)
      *      TEXT('CHECK TOLLERANZE PREZZO')
      *-----------------------------------------------------*
      * CREATE FUNCTION SNSSYSOBJ.CHECK_TOLLER (
      *   I_CTLQ   char(1) ,
      *   I_UDBA   char(3) ,
      *   I_CFAM   char(1) ,
      *   I_CSTG   char(1) ,
      *   I_UDBF   char(3) ,
      *   I_CFOR   char(6) ,
      *   I_TANA   char(1) ,
      *   I_TPOF   char(1) ,
      *   I_CTES   char(6) ,
      *   I_COL3   char(3) ,
      *   I_QTAO   numeric(13 , 2) ,
      *   I_DTCO   numeric(8, 0)   ,
      *   I_PRZC   numeric(18 , 5) ,
      *   I_CTOA   CHAR(1) ,
      *   I_PRUN   numeric(18 , 5) )
      *   RETURNS CHAR(1)
      *   LANGUAGE RPGLE
      *   SPECIFIC SNSSYSOBJ.CHECK_TOLLER
      *   NOT DETERMINISTIC
      *   CALLED ON NULL INPUT
      *   NOT FENCED
      *   EXTERNAL NAME 'SNSSYSOBJ/ACW001(CHECK_TOLLER)'
      *   PARAMETER STYLE db2SQL ;
      *---------------------------------------------------------*
      * STORE PROCEDURE CHE INTERROGA LA FUNCTION
      *---------------------------------------------------------*
      * CREATE PROCEDURE SNSSYSOBJ.SP_CHECK_TOLLERANZA_PREZZI (
      * I_CTLQ   char(1) ,
      * I_UDBA   char(3) ,
      * I_CFAM   char(1) ,
      * I_CSTG   char(1) ,
      * I_UDBF   char(3) ,
      * I_CFOR   char(6) ,
      * I_TANA   char(1) ,
      * I_TPOF   char(1) ,
      * I_CTES   char(6) ,
      * I_COL3   char(3) ,
      * I_QTAO   numeric(13 , 2) ,
      * I_DTCO   numeric(8, 0)   ,
      * I_PRZC   numeric(18 , 5) ,
      * I_CTOA   CHAR(1) ,
      * I_PRUN   numeric(18 , 5) )
      * DYNAMIC RESULT SETS 1
      * LANGUAGE SQL
      * SPECIFIC SNSSYSOBJ.SP_CHECK_TOLLERANZA_PREZZI
      * NOT DETERMINISTIC
      * MODIFIES SQL DATA
      * CALLED ON NULL INPUT
      * CONCURRENT ACCESS RESOLUTION DEFAULT
      * SET OPTION  ALWBLK = *ALLREAD ,
      * ALWCPYDTA = *OPTIMIZE ,
      * COMMIT = *NONE ,
      * DECRESULT = (31, 31, 00) ,
      * DFTRDBCOL = *NONE ,
      * DYNDFTCOL = *NO ,
      * DYNUSRPRF = *USER ,
      * SRTSEQ = *HEX
      * BEGIN
      *   -- Declare Cursori
      *   DECLARE C1_ESTRAZIONE
      *   CURSOR FOR
      *   SELECT SNSSYSOBJ.UDF_CHECK_TOLLERANZA_PREZZI
      *   (
      *       I_CTLQ,
      *       I_UDBA,
      *       I_CFAM,
      *       I_CSTG,
      *       I_UDBF,
      *       I_CFOR,
      *       I_TANA,
      *       I_TPOF,
      *       I_CTES,
      *       I_COL3,
      *       I_QTAO,
      *       I_DTCO,
      *       I_PRZC,
      *       I_CTOA
      *       I_PRUN
      *   )
      *   FROM
      *   SYSIBM.SYSDUMMY1
      *   FOR READ ONLY ;
      *
      *   -- DECLARE HANDLERS
      *   -- HANDLER PER OGGETTO GIÀ ESISTENTE
      *   DECLARE CONTINUE HANDLER FOR SQLSTATE '42710'
      *   BEGIN
      *   END ;
      *
      *   -- HANDLER PER MANCANZA OGGETTO
      *   DECLARE CONTINUE HANDLER FOR SQLSTATE '42704'
      *   BEGIN
      *   END ;
      *
      *   -- HANDLER PER CHIAMATA A QCMDEXC
      *   DECLARE CONTINUE HANDLER FOR SQLSTATE '38501'
      *   BEGIN
      *   END ;
      *
      *   -- HANDLER PER CURSORE NON APERTO
      *   DECLARE CONTINUE HANDLER FOR SQLSTATE '24501'
      *   BEGIN
      *   END ;
      *
      *   -- HANDLER PER CURSORE NON APERTO
      *   DECLARE CONTINUE HANDLER FOR SQLSTATE '0100C'
      *   BEGIN
      *   END ;
      *
      *    -- MAIN
      *
      *    -- IMPOSTO LISTA LIBRERIE
      *    CALL CHECKCL . SET_LIBRARY_LIST_FROM_SIF
      *   (
      *   'SNSSYS'
      *   ) ;
      *
      *   --  Apertura Cursore
      *   CLOSE C1_ESTRAZIONE ;
      *   OPEN C1_ESTRAZIONE ;
      *   RETURN ;
      *   END  ;
      *--------------------------------------------------------
     ***************************************************************
      * Modifiche                                                  *
      * En1 - Enrica Gandini   02/02/2023
      *       forzato chiamata AC930 con flag = 'R' ricerca prezzo
      *       riferimento
     ***************************************************************
     * /COPY
      /COPY VGMSRC/QCOPYGEN,VGMGEN_D

       // UDTF call parameter constants
       Dcl-S UDTF_FirstCall     INT(10) Inz(-2) ;
       Dcl-S UDTF_Open          INT(10) Inz(-1) ;
       Dcl-S UDTF_Fetch         INT(10) Inz(0) ;
       Dcl-S UDTF_Close         INT(10) Inz(1) ;
       Dcl-S UDTF_LastCall      INT(10) Inz(2) ;


       // SQL States
       Dcl-C SQLSTATEOK      '00000' ;
       Dcl-C ENDOFTABLE      '02000' ;
       Dcl-C UDTF_ERROR      'US001' ;

       //  NULL Constants
       Dcl-C ISNULL         -1 ;
       Dcl-C NOTNULL         0 ;

       Dcl-S FirstFetch     IND ;
       Dcl-S NullData       IND ;

       // ds esterne
       Dcl-Ds Kpjba  Ext qualified End-Ds ;
       Dcl-Ds zAC930 Ext End-Ds ;
       Dcl-Ds z@ctoa Ext End-Ds ;

       // programma per decodifica tabelle
       Dcl-Pr $TAB  ExtPgm('$TAB');
         @dli0   char(3);
         @dli1   char(6) ;
         @dli2   char(150);
         @dli3   char(1) ;
         lingua  char(1) ;
         family  char(1) ;
       End-Pr;

       // programma per calcolo prezzi
       Dcl-Pr AC930 ExtPgm('AC930');
         Kpjba likeDs(kpjba);
         ZAC930  likeDs(ZAC930);
       End-Pr;


       // Gestione tabella e ricerche F4
       Dcl-S @dli0    char(3) ;
       Dcl-S @dli1    char(6) ;
       Dcl-S @dli2    char(150) ;
       Dcl-S @dli3    char(1) ;
       Dcl-S lingua   char(1) ;
       Dcl-S family   char(1) ;
       Dcl-S $codtab  char(3) Inz ;
       Dcl-S $eletab  char(6) Inz ;

       // variabili di comodo
       Dcl-S W_FAPERP zoned(4:1);
       Dcl-S W_FAPERN zoned(4:1);
       Dcl-S @BO      char(1);

      * per comandi per addlbile
     D COM             S             50    DIM(1) CTDATA PERRCD(1)
     D qcmdexc         pr                  extpgm('QCMDEXC')
     D   cmd                        200a   options(*varsize) const
     D   cmdlen                      15p 5 const
     D   lLenCmd       S             10  0
     D   lCmd          S            150    varying
       // --------------------------------------------------
       // Procedure name: CHECK_TOLLER
       // Purpose:
       // Returns:
       // Parameter:
       // Parameter:
       // --------------------------------------------------
       DCL-PROC CHECK_TOLLER EXPORT;
         DCL-PI *N ;

        // Table Function Input Parameters
           I_CTLQ                           char(1) ;
           I_UDBA                           char(3) ;
           I_CFAM                           char(1) ;
           I_CSTG                           char(1) ;
           I_UDBF                           char(3) ;
           I_CFOR                           char(6) ;
           I_TANA                           char(1) ;
           I_TPOF                           char(1) ;
           I_CTES                           char(6) ;
           I_COL3                           char(3) ;
           I_QTAO                           zoned(13:2) ;
           I_DTCO                           zoned(8:0) ;
           I_PRZC                           zoned(18:5) ;
           I_CTOA                           char(1) ;
           I_PRUN                           zoned(18:5) ;

        // Table Function Output Parameters (columns)
           O_FLTO                           CHAR(1) ;

        // Null Indicator Input Parameters
           I_NI_CTLQ                        INT(5) ;
           I_NI_UDBA                        INT(5) ;
           I_NI_CFAM                        INT(5) ;
           I_NI_CSTG                        INT(5) ;
           I_NI_UDBF                        INT(5) ;
           I_NI_CFOR                        INT(5) ;
           I_NI_TANA                        INT(5) ;
           I_NI_TPOF                        INT(5) ;
           I_NI_CTES                        INT(5) ;
           I_NI_COL3                        INT(5) ;
           I_NI_QTAO                        INT(5) ;
           I_NI_DTCO                        INT(5) ;
           I_NI_PRZC                        INT(5) ;
           I_NI_CTOA                        INT(5) ;
           I_NI_PRUN                        INT(5) ;
        // Null Indicator Output Parameters
           NI_FLTO                          INT(5) ;

        // DB2SQL Style Parameters
           pSQLState                         CHAR(5) ;
           pFunctionName                     CHAR(517) ;
           pSpecificName                     CHAR(128) ;
           pSQLMsgText                       VARCHAR(70) ;

         END-PI ;

      * Impostazione libreria CPI@PUB
         lCmd = com(1);
         lLenCmd = 22;
         callP(e)  QCMDEXC(lCmd : lLenCmd);

      * Imposto utente
         Clear Kpjba;

         EXEC SQL
           SET :KPJBA.KNMUS=SYSTEM_USER;

         NI_FLTO = NOTNULL ;

         Clear @BO ;
         if I_CTLQ = 'B' ;
           @BO = I_CTLQ ;
           I_CTLQ = 'Y' ;
         EndIf ;
         //se tipo anagrafica = 'A' allora controllo flag ctoa
         if I_TANA = 'A' and I_CTOA <> ' ' ;

               $codtab = 'TOA'  ;
               $eletab = I_CTOA ;
               @dli0   = $codtab;
               @dli1   = $eletab;
              callP  $TAB  ( @dli0 :@dli1 :@dli2 :@dli3 :lingua :family ) ;

               if @dli3 = *blank;
                 z@ctoa = @dli2 ;
                 if (FPCAJN<>'Y' and FMASJN<>'Y' and  FINTJN<>'Y');
                   //CONTINUO NORMALMENTE IL GIRO
                 else;
                   //controllo prezzo richiesto e prezzo conf dal fornitore
                   //se uguali restituisco Y  se diversi N (GSPRUN/WAORA = I_PRCO)

                   if I_PRZC = I_PRUN;
                     O_FLTO = 'Y';
                   else;
                     O_FLTO = 'N';
                   endif;

                   return;

                 endif;

               endif;
         endif;

         //CHIAMO PGM RICERCA PREZZI SU LISTINI
         CLEAR ZAC930 ;
         CTLQE3 = I_CTLQ  ;
         // EN1 : se controllo BO ricerco prezzo Lua di RIFERIMENTO
         // e lo controllo col prezzo di anagrafica ricevuto
         QTAOE3 = I_QTAO  ;
         If @bo ='B' ;
           CTLQE3 = 'R' ;
           QTAOE3 = 0;
         EndIF ;

         UDBAE3 = I_UDBA  ;
         CFAME3 = I_CFAM  ;
         CSTGE3 = I_CSTG  ;
         UDBFE3 = I_UDBF  ;
         CFORE3 = I_CFOR  ;
         TANAE3 = I_TANA  ;
         TPOFE3 = I_TPOF  ;
         CTESE3 = I_CTES  ;
         COL3E3 = I_COL3  ;
         DTCOE3 = I_DTCO  ;
         KPJBA.KPJBU = ZAC930;
         callP  AC930  ( KPJBA : ZAC930 ) ;

         if CRITE3 = '  ' and PZABE3<>0;

         //PZABE3 VALORIZZATO ALLORA CONTROLLO LIMITI PERCENTUALI
         EXEC SQL
          SELECT FAPERP,FAPERN INTO :W_FAPERP,:W_FAPERN
          FROM LMPTO01K
          WHERE FATANA=:TANAE3;

           if (W_FAPERP<>0 OR W_FAPERN<>0);

             If @bo ='B' ;
             //se il prezzo confermato } MINORE   del prezzo del lua+percentuale
               IF PZARE3<=(I_PRZC+((I_PRZC*W_FAPERP)/100))
               //e se il prezzo confermato } MAGGIORE del prezzo del lua-percentuale
                  AND PZARE3>=(I_PRZC-((I_PRZC*W_FAPERN)/100));

                  O_FLTO = 'Y';
               else;
                 O_FLTO = 'N';
               endif;
             Else ;
             //se il prezzo confermato } MINORE   del prezzo del lua+percentuale
               IF I_PRZC<=(PZABE3+((PZABE3*W_FAPERP)/100))
               //e se il prezzo confermato } MAGGIORE del prezzo del lua-percentuale
                  AND I_PRZC>=(PZABE3-((PZABE3*W_FAPERN)/100));

                  O_FLTO = 'Y';
               else;
                 O_FLTO = 'N';
               endif;
             EndIf ;

           else;
             //SE NON TROVO le percentuali il prezzo deve essere uguale al LUA
             if I_PRZC = PZABE3;
               O_FLTO = 'Y';
               else;
                O_FLTO = 'N';
             endif;

           endif;
         else;
           //SE NON C'E' PREZZO SU LUA METTO N
           O_FLTO = 'N';
         endif;

         Return ;

       END-PROC ;
** COM  Comandi per QCMDEXC
ADDLIBLE LIB(CPI@PUB)
