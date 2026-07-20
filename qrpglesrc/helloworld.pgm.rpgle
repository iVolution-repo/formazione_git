**free

      ctl-opt dftactgrp(*no);

      dcl-s mytext char(25);

<<<<<<< HEAD
      /copy '../qcopysrc/mycopy.rpgle'
=======
      /copy '../qcpysrc/mycopy.rpgle'
>>>>>>> 3af0881233f82fb625c69155cf239a93d59a2777
   
      dsply 'Vuoi continuare? (S/N)' '' mytext;

      *inlr = *on;
      return;


      dcl-proc testproc ;
         dcl-pi *n ;
            parm1 char(10) ; 
         end-pi;
        
      end-proc;
      