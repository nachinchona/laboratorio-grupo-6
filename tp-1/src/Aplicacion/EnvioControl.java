import java.util.concurrent.*;
import java.util.Random;

public class EnvioControl extends Thread {

    private String[] mensajes = { "Hola", "Ciao", "Hello", "Bonjour", "Ni hao", "Annyeong", "Konnichiwa", "Hallo", "Zdravstvuyte" };
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(mensajes.length);
    private Beeper[] beeper = new Beeper[mensajes.length];
    private Random r = new Random();

    public EnvioControl() {
        for (int i = 0; i < beeper.length; i++) {
            beeper[i] = new Beeper(mensajes[i], r.nextInt(3,15));
        }
    }

    public void setNotificador(Notificador notificador) {
        for (int i = 0; i < beeper.length; i++) {
            beeper[i].setNotificador(notificador);
        }
    }

    public void run() {
        for (int i = 0; i < beeper.length; i++) {
            ScheduledFuture<?> beeperHandle = scheduler.scheduleWithFixedDelay(beeper[i], beeper[i].getDelay(), beeper[i].getDelay(), TimeUnit.SECONDS);
            Runnable canceller = () -> beeperHandle.cancel(true);
            scheduler.schedule(canceller, 1, TimeUnit.HOURS);
        }
    }

}