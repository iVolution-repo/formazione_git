**free

      ctl-opt dftactgrp(*no);

      dcl-s mytext char(25);

      /copy '../qcpysrc/mycopy.rpgle'
   
      dsply 'Vuoi continuare? (S/N)' '' mytext;

      *inlr = *on;
      return;


      dcl-proc testproc ;
         dcl-pi *n ;
            parm1 char(10) ; 
         end-pi;
        
      end-proc;
      