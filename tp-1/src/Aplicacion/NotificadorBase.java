package Aplicacion;

public class NotificadorBase implements Notificador {
    private GUI gui;
    private EnvioControl control;

    public NotificadorBase(GUI gui, EnvioControl control){
        this.gui = gui;
        this.control = control;
    }

    public void enviar(String mensaje) {
        gui.agregarTexto("Por notificacion comun: " + mensaje);
    }

    public EnvioControl getEnv(){
        return control;
    }

    public GUI getGUI() {
        return this.gui;
    }
}
