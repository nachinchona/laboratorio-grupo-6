import java.util.Random;

public class Beeper implements Runnable {
    private Notificador notificador;
    private String[] mensajes;

    public Beeper(String[] mensajes) {
        this.mensajes = mensajes;
    }

    public void setNotificador(Notificador notificador) {
        this.notificador = notificador;
    }

    public void run() {
        Random r = new Random();
        notificador.enviar(mensajes[r.nextInt(0, mensajes.length)]);
    }
}
