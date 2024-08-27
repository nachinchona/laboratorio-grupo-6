
//clase concreta de la interfaz
public class NotificadorBase implements Notificador {
    private GUI gui;
    private EnvioControl control;

    public NotificadorBase(GUI gui, EnvioControl control){
        this.gui = gui;
        this.control = control;
    }

    public void enviar(String mensaje) {
        gui.agregarTexto("Por notificaci�n com�n: " + mensaje);
    }

    public void mandar(String mensaje) {
        gui.agregarTexto(mensaje);
    }

    public EnvioControl getEnv(){
        return control;
    }
}
