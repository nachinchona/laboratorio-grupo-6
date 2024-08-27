//decorador base de la clase Notificador
public abstract class DecoradorNotificador implements Notificador {
    protected Notificador notificadorDecorado;
    protected EnvioControl control;
    protected GUI gui;

    public DecoradorNotificador(Notificador notificador) {
        notificadorDecorado = notificador;
        control = notificador.getEnv();
        gui = notificador.getGUI();
        control.setNotificador(this);
    }

    public void enviar(String mensaje) {
        notificadorDecorado.enviar(mensaje);
    }

    public EnvioControl getEnv(){
        return notificadorDecorado.getEnv();
    }

    public GUI getGUI() {
        return this.gui;
    }
}
