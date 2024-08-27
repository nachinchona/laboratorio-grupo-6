package Decoradores;

import Aplicacion.EnvioControl;
import Aplicacion.Notificador;

//decorador base de la clase Notificador
public abstract class DecoradorNotificador implements Notificador {
    protected Notificador notificadorDecorado;
    protected EnvioControl control;

    public DecoradorNotificador(Notificador notificador) {
        notificadorDecorado = notificador;
        control = notificador.getEnv();
        control.setNotificador(this);
    }

    public void enviar(String mensaje) {
        notificadorDecorado.enviar(mensaje);
    }

    public void mandar(String mensaje) {
        notificadorDecorado.mandar(mensaje);
    }

    public EnvioControl getEnv(){
        return notificadorDecorado.getEnv();
    }
}
