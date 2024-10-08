package Decoradores;

import Aplicacion.Notificador;

public class WhatsAppDecorator extends DecoradorNotificador {
    public WhatsAppDecorator(Notificador notificador){
        super(notificador);
    }

    public void enviar(String mensaje){
        //super.enviar(mensaje + "\nPor WhatsApp: " + mensaje);
        super.enviar(mensaje);
        gui.agregarTexto("Por WhatsApp: " + mensaje);
    }
}
