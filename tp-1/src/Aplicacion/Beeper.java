public class Beeper implements Runnable {
    private Notificador notificador;
    private String mensaje;
    private int delay;

    public Beeper(String mensaje, int delay) {
        this.mensaje = mensaje;
        this.delay = delay;
    }

    public void setNotificador(Notificador notificador) {
        this.notificador = notificador;
    }

    public int getDelay() {
        return this.delay;
    }

    public void run() {
        notificador.enviar(mensaje);
    }
}
